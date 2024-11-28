import placeholder from "@/public/images/sign-in/placeholder-768x864.png";
import SIGN_IN from "@/public/images/Subjudul (3).png";
import SignInForm from "../_components/sign-in/sign-in-form";
import AuthPoster from "../_components/auth-poster";
import React from "react";

const SignInPage: React.FC = () => {
  return (
    <section id="sign-in" className="flex items-center justify-center">
      <AuthPoster image={SIGN_IN} name="Sign In Poster" />
      <SignInForm />
    </section>
  );
};

export default SignInPage;
