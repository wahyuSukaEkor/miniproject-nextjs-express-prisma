import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <section
      className={`mx-auto flex h-[176px] w-full flex-col bg-white  md:h-[434px]`}
    ></section>
  );
};

export default Footer;
