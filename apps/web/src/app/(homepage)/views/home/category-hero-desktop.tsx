import * as React from "react";
import { FaEllipsisH, FaGamepad, FaWindows } from "react-icons/fa";
import { MdFestival } from "react-icons/md";
import { MdSportsSoccer } from "react-icons/md";
import { FaClapperboard, FaMusic } from "react-icons/fa6";
import { GrWorkshop } from "react-icons/gr";
import Link from "next/link";

interface ICategoryDesktopProps {}

const CategoryDesktop: React.FunctionComponent<ICategoryDesktopProps> = (
  props,
) => {
  return (
    <section className="mt-8 hidden space-y-3 px-5 font-medium text-black md:block">
      <div className="flex justify-center space-x-10 flex-nowrap">
        <Link href={`/explore`}>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[70px] w-[70px] rounded-full border border-gray-400 bg-white p-5 hover:bg-gray-200">
              <FaWindows className="text-black text-3xl" />
            </div>
            <h1 className="mt-2 text-center text-[18px]">All</h1>
          </div>
        </Link>
        <Link href={`/#festival`} scroll={true}>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[70px] w-[70px] rounded-full border border-gray-400 bg-white p-5 hover:bg-gray-200">
              <MdFestival className="text-black text-3xl" />
            </div>
            <h1 className="mt-2 text-center text-[18px]">Festival & Konser</h1>
          </div>
        </Link>
        <Link href={`/#sport`} scroll={true}>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[70px] w-[70px] rounded-full border border-gray-400 bg-white p-5 hover:bg-gray-200">
              <MdSportsSoccer className="text-black text-3xl" />
            </div>
            <h1 className="mt-2 text-center text-[18px]">Olahraga</h1>
          </div>
        </Link>
        <Link href={`/#seminar`} scroll={true}>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[70px] w-[70px] rounded-full border border-gray-400 bg-white p-5 hover:bg-gray-200">
              <GrWorkshop className="text-black text-3xl" />
            </div>
            <h1 className="mt-2 text-center text-[18px]">Workshop & Seminar</h1>
          </div>
        </Link>
        <Link href={`/#drama`} scroll={true}>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[70px] w-[70px] rounded-full border border-gray-400 bg-white p-5 hover:bg-gray-200">
              <FaClapperboard className="text-black text-3xl" />
            </div>
            <h1 className="mt-2 text-center text-[18px]">Teater & Drama</h1>
          </div>
        </Link>
        <Link href={`/#game`} scroll={true}>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[70px] w-[70px] rounded-full border border-gray-400 bg-white p-5 hover:bg-gray-200">
              <FaGamepad className="text-black text-3xl" />
            </div>
            <h1 className="mt-2 text-center text-[18px]">Game & E-Sports</h1>
          </div>
        </Link>
        <Link href={`/#lainnya`} scroll={true}>
          <div className="flex flex-col items-center justify-center">
            <div className="h-[70px] w-[70px] rounded-full border border-gray-400 bg-white p-5 hover:bg-gray-200">
              <FaEllipsisH className="text-black text-3xl" />
            </div>
            <h1 className="mt-2 text-center text-[18px]">Lainnya</h1>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CategoryDesktop;
