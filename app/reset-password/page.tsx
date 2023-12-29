"use client";

import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();

  const resetPassword = async (formData: FormData) => {
    const password = formData.get("password")?.toString();
    const passwordConfirmation = formData
      .get("passwordConfirmation")
      ?.toString();
    // const token = formData.get("token")?.toString();

    if (!password || !passwordConfirmation) {
      return;
    }

    if (password !== passwordConfirmation) {
      return;
    }

    let { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Reset Password</h1>
      <form className="flex flex-col" action={resetPassword}>
        <label htmlFor="password">Password</label>
        <input
          className="text-gray-600"
          type="password"
          name="password"
          id="password"
        />
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          className="text-gray-600"
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
