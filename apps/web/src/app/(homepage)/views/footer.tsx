import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <footer id="contact" className="bg-gray-800 text-white py-4">
        <p className="text-gray-500 text-center">
          &copy; {new Date().getFullYear()} TIKETAKTI. All rights
          reserved.
        </p>
    </footer>
  );
};

export default Footer;
