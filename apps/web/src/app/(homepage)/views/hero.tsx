import * as React from "react";
import { Input } from "@/components/ui/input";
import InputSearch from "../_components/search-bar";
import CategoryDesktop from "./home/category-hero-desktop";
interface IHeroProps {}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  return (
    <section>
      <div
        className={`mx-auto flex h-[176px] w-full flex-col bg-[#5CC8E4] bg-[url('https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp')] bg-cover bg-center md:h-[434px]`}
      >
        <h2 className="mx-auto mt-[2em] text-[22px] text-center italic text-white md:mt-[120px]">
          Hey you,<span className=" font-bold">what tickets are you looking for?</span>
        </h2>
        <InputSearch />
        <CategoryDesktop />
      </div>
    </section>
  );
};

export default Hero;
