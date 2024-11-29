"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";;
import InputSearch from "../_components/search-bar";
import Link from "next/link";

interface INavbarDetailProps {}

const NavbarDetail: React.FunctionComponent<INavbarDetailProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  return (
    <section className=" hidden h-[152px] w-full border-b-2 bg-white  text-black md:block ">
      <div className="mx-[168px] flex justify-between pt-[20px]">
        <Link href={`/`}>
          <h1 className=" text-[20px] font-semibold text-[#5cc8e4]">NGIVENT</h1>
        </Link>
        <div className=" flex space-x-2">
          <Link href={`/sign-in`}>
            <Button
              className=" mx-auto h-[40px] w-[78px] border border-gray-400 bg-white text-black"
              type="button"
            >
              Sign In
            </Button>
          </Link>
          <Link href={`/sign-up`}>
            <Button
              className=" mx-auto h-[40px] w-[78px] border border-gray-400 bg-white text-black"
              type="button"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div id="stroke" className=" mt-[20px] border "></div>
      <div className="mx-[168px] ">
        <InputSearch />
      </div>
    </section>
  );
};

export default NavbarDetail;
