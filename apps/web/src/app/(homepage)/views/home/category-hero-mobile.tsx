import * as React from "react";
import { FaWindows } from "react-icons/fa";
import { MdFestival } from "react-icons/md";
import { MdSportsSoccer } from "react-icons/md";
import { FaClapperboard, FaMusic } from "react-icons/fa6";
import { GrWorkshop } from "react-icons/gr";
import { BiCameraMovie } from "react-icons/bi";
import { TbBuildingCircus } from "react-icons/tb";
import Link from "next/link";

interface ICategorySectionProps {}

const CategorySection: React.FunctionComponent<ICategorySectionProps> = (
  props,
) => {
  return (
    <section className="block px-5 md:hidden py-3">
      <div className="flex justify-start space-x-6 overflow-x-auto">
        <div className="flex flex-col items-center justify-center">
          <Link href={`/explore`}>
            <div className="h-[60px] w-[60px] rounded-full border border-slate-400 bg-white p-4">
              <FaWindows className="text-black text-2xl" />
            </div>
          </Link>
          <h1 className="mt-2 text-center text-[14px] text-black">All</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href={`/#festival`} scroll={true}>
            <div className="h-[60px] w-[60px] rounded-full border border-slate-400 bg-white p-4">
              <MdFestival className="text-black text-2xl" />
            </div>
          </Link>
          <h1 className="mt-2 text-center text-[14px] text-black">Festival</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href={`/#sport`} scroll={true}>
            <div className="h-[60px] w-[60px] rounded-full border border-slate-400 bg-white p-4">
              <MdSportsSoccer className="text-black text-2xl" />
            </div>
          </Link>
          <h1 className="mt-2 text-center text-[14px] text-black">Olahraga</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href={`/#seminar`} scroll={true}>
            <div className="h-[60px] w-[60px] rounded-full border border-slate-400 bg-white p-4">
              <GrWorkshop className="text-black text-2xl" />
            </div>
          </Link>
          <h1 className="mt-2 text-center text-[14px] text-black">Seminar</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href={`/#drama`} scroll={true}>
            <div className="h-[60px] w-[60px] rounded-full border border-slate-400 bg-white p-4">
              <FaClapperboard className="text-black text-2xl" />
            </div>
          </Link>
          <h1 className="mt-2 text-center text-[14px] text-black">Teater</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href={`/#game`} scroll={true}>
            <div className="h-[60px] w-[60px] rounded-full border border-slate-400 bg-white p-4">
              <BiCameraMovie className="text-black text-2xl" />
            </div>
          </Link>
          <h1 className="mt-2 text-center text-[14px] text-black">E-Sports</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href={`/#lainnya`} scroll={true}>
            <div className="h-[60px] w-[60px] rounded-full border border-slate-400 bg-white p-4">
              <TbBuildingCircus className="text-black text-2xl" />
            </div>
          </Link>
          <h1 className="mt-2 text-center text-[14px] text-black">Lainnya</h1>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
