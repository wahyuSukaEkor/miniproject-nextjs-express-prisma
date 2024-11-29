import * as React from "react";
import { FaWindows } from "react-icons/fa";
import { MdFestival } from "react-icons/md";
import { MdSportsSoccer } from "react-icons/md";
import { FaMusic } from "react-icons/fa6";
import { GrWorkshop } from "react-icons/gr";
import { BiCameraMovie } from "react-icons/bi";
import { TbBuildingCircus } from "react-icons/tb";
import Link from "next/link";

interface ICategorySectionProps {}

const CategorySection: React.FunctionComponent<ICategorySectionProps> = (
  props,
) => {
  return (
    <section className="block px-5 md:hidden ">
      <div className=" flex h-[120px] w-full gap-5 overflow-hidden overflow-x-auto ">
        <div className=" flex flex-col items-center justify-center ">
          <Link href={`/explore`}>
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <FaWindows />
            </div>
          </Link>
          <h1 className=" mt-1 text-center text-[14px]">All</h1>
        </div>

        <div className=" flex flex-col items-center justify-center">
          <Link href={`/#festival`} scroll={true}>
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <MdFestival className=" text-red-600" />
            </div>
          </Link>
          <h1 className=" mt-1 text-center text-[14px]">Festival</h1>
        </div>

        <div className=" flex flex-col items-center justify-center">
          <Link href={`/#sport`} scroll={true}>
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <MdSportsSoccer className="text-[#26aa99]" />
            </div>
          </Link>
          <h1 className=" mt-1 text-center text-[14px]">Sport</h1>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <Link href={`/#music`} scroll={true}>
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <FaMusic />
            </div>
          </Link>
          <h1 className=" mt-1 text-center text-[14px]">Concert</h1>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <Link href={`/#seminar`} scroll={true}>
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <GrWorkshop className=" text-[#0053de]" />
            </div>
          </Link>
          <h1 className=" mt-1 text-center text-[14px]">Workshop</h1>
        </div>

        <div className=" flex flex-col items-center justify-center">
          <Link href={`/#drama`} scroll={true}>
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <BiCameraMovie className=" text-[#0053de]" />
            </div>
          </Link>

          <h1 className=" mt-1 text-center text-[14px]">Movie</h1>
        </div>

        <div className=" flex flex-col items-center justify-center">
          <Link href={`/#attraction`} scroll={true}>
            <div className="h-[50px] w-[50px] rounded-lg border border-slate-400 bg-white p-4">
              <TbBuildingCircus className=" text-red-500" />
            </div>
          </Link>

          <h1 className=" mt-1 text-center text-[14px]">Attraction</h1>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
