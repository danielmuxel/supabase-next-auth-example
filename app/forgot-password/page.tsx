"use client";

import { createClient } from "@/utils/supabase/client";


export default function ForgotPasswordPage() {
  const supabase = createClient();

  const sendResetPasswordEmail = async (formData: FormData) => {
    console.log('sendResetPasswordEmail');
    
    const email = formData.get("email")?.toString();

    console.log('email', email);
    

    if (!email) {
      return;
    }

    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <form className="flex flex-col" action={sendResetPasswordEmail}>
        <label htmlFor="email">Email</label>
        <input className="text-gray-600" type="email" name="email" id="email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
