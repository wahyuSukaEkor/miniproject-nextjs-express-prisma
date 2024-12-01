import React from "react";

type Props = {
  name: string;
};

const AuthPoster: React.FC<Props> = (props) => {
  const { name } = props;

  return (
    <div className="relative hidden min-h-screen w-full lg:block">
      <img
        src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={name}
        className="bg-cover w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-50 mt-48 flex justify-center p-10">
        <div>
          <h1 className="text-center text-[38px] font-semibold text-white">
            Log in to enjoy all the benefits!
          </h1>
          <h1 className="text-center text-white">
            You only need to enter your cellphone number or email. Easy and
            fast, immediately feel the various conveniences and benefits of our
            services!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AuthPoster;
