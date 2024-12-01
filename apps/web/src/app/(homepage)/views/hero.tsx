import * as React from "react";
import { Input } from "@/components/ui/input";
import InputSearch from "../_components/search-bar";
import CategoryDesktop from "./home/category-hero-desktop";

interface IHeroProps {}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  return (
    <section>
      <div
        className="mx-auto flex h-[250px] w-full flex-col bg-cover bg-center bg-no-repeat md:h-[500px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-40">
          <h2 className="text-3xl font-semibold text-white text-center px-6 md:px-12 md:text-4xl">
            Discover and Book Amazing Events Near You
          </h2>
          <p className="text-xl text-white text-center mt-4 mb-6 px-6 md:text-2xl">
            Find tickets for the best events, concerts, festivals, and more!
          </p>
          <InputSearch />
        </div>
      </div>
      <CategoryDesktop />
    </section>
  );
};

export default Hero;
