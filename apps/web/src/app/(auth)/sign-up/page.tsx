import placeholder from "@/public/images/signup.webp";
import SignUpForm from "../_components/sign-up/sign-up-form";
import React from "react";
import AuthPosterRegis from "../_components/auth-poster-regis";

const SignUpPage: React.FC = () => {
  return (
    <section id="sign-up" className="flex items-center justify-center">
      <AuthPosterRegis name="Sign Up Poster" />
      <SignUpForm />
    </section>
  );
};

export default SignUpPage;
