import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return <main className="mx-auto">{children}</main>;
};

export default AuthLayout;
