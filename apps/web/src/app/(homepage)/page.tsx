import React from "react";
import Hero from "./views/hero";
import TopNews from "./views/home/top-news";
import CategoryMusikSection from "./views/home/category-musik";
import NavbarDesktop from "./views/navbar-desktop";
import AllEventSection from "./views/home/all-event";
import CategorySeminarSection from "./views/home/category-seminar";
import { Button } from "@/components/ui/button";
import CategorySection from "./views/home/category-hero-mobile";
import CategoryFestivalSection from "./views/home/category-festival";
import CategorySportsSection from "./views/home/category-sport";
import CategoryAttractionSection from "./views/home/category-attraction";
import CategoryDramaSection from "./views/home/category-drama";
import Footer from "./views/footer";

const HomePage: React.FC = () => {
  return (
    <section className="">
      <NavbarDesktop />
      <Hero />
      <CategorySection />
      <CategoryDramaSection />
      <CategoryMusikSection />
      <CategoryFestivalSection />
      <CategoryAttractionSection />
      <CategorySportsSection />
      <CategorySeminarSection />
      {/* <Footer /> */}
    </section>
  );
};

export default HomePage;
