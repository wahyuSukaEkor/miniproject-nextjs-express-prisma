"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import InputSearch from "../_components/search-bar";
import Link from "next/link";

interface INavbarDetailProps {}

const NavbarDetail: React.FunctionComponent<INavbarDetailProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  return (
    <section className="hidden h-[152px] w-full border-b-2 bg-gray-900 text-white md:block">
      <div className="mx-[168px] flex justify-between pt-5">
        <Link href={`/`}>
          <h1 className="text-2xl font-semibold text-[#5cc8e4]">TIKETAKTI</h1>
        </Link>
        <div className="flex space-x-4">
          <Link href={`/sign-in`}>
            <Button
              className="h-10 w-20 border border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
              type="button"
            >
              Sign In
            </Button>
          </Link>
          <Link href={`/sign-up`}>
            <Button
              className="h-10 w-20 border border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
              type="button"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-5 border-t border-gray-700"></div>
      <div className="mx-[168px]">
        <InputSearch />
      </div>
    </section>
  );
};

export default NavbarDetail;
