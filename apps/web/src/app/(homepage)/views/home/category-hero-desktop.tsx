import * as React from "react";
import { FaWindows } from "react-icons/fa";
import { MdFestival } from "react-icons/md";
import { MdSportsSoccer } from "react-icons/md";
import { FaMusic } from "react-icons/fa6";
import { GrWorkshop } from "react-icons/gr";
import { BiCameraMovie } from "react-icons/bi";
import { TbBuildingCircus } from "react-icons/tb";
import Link from "next/link";

interface ICategoryDesktopProps {}

const CategoryDesktop: React.FunctionComponent<ICategoryDesktopProps> = (
  props,
) => {
  return (
    <section className=" mt-8 hidden space-y-3 px-5 font-medium text-white md:block ">
      {/* <div className="  h-auto  flex overflow-x-auto overflow-hidden gap-5 bg-red-400 mx-96"> */}
      <div className="  flex justify-center  space-x-5">
        <Link href={`/explore`}>
          <div className=" flex flex-col items-center justify-center ">
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <FaWindows className=" text-black" />
            </div>
            <h1 className=" mt-1 text-center text-[14px]">All</h1>
          </div>
        </Link>
        <Link href={`/#festival`} scroll={true}>
          <div className=" flex flex-col items-center justify-center">
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <MdFestival className=" text-red-600" />
            </div>
            <h1 className=" mt-1 text-center text-[14px]">Festival</h1>
          </div>
        </Link>
        <Link href={`/#sport`} scroll={true}>
          <div className=" flex flex-col items-center justify-center">
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <MdSportsSoccer className="text-[#26aa99]" />
            </div>
            <h1 className=" mt-1 text-center text-[14px]">Sport</h1>
          </div>
        </Link>
        <Link href={`/#music`} scroll={true}>
          <div className=" flex flex-col items-center justify-center">
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <FaMusic className=" text-black" />
            </div>
            <h1 className=" mt-1 text-center text-[14px]">Concert</h1>
          </div>
        </Link>
      </div>
      <div className=" flex justify-center   space-x-5 ">
        <Link href={`/#seminar`} scroll={true}>
          <div className=" flex flex-col items-center justify-center">
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <GrWorkshop className=" text-[#0053de]" />
            </div>
            <h1 className=" mt-1 text-center text-[14px]">Workshop</h1>
          </div>
        </Link>
        <Link href={`/#drama`} scroll={true}>
          <div className=" flex flex-col items-center justify-center">
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <BiCameraMovie className=" text-[#0053de]" />
            </div>
            <h1 className=" mt-1 text-center text-[14px]">Movie</h1>
          </div>
        </Link>
        <Link href={`/#attraction`} scroll={true}>
          <div className=" flex flex-col items-center justify-center">
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <TbBuildingCircus className=" text-red-500" />
            </div>
            <h1 className=" mt-1 text-center text-[14px]">Attraction</h1>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CategoryDesktop;
