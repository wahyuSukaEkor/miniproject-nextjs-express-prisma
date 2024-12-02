import React from "react";
import Hero from "./views/hero";
import CategoryGameSection from "./views/home/category-game";
import NavbarDesktop from "./views/navbar-desktop";
import CategorySeminarSection from "./views/home/category-seminar";
import CategorySection from "./views/home/category-hero-mobile";
import CategoryFestivalSection from "./views/home/category-festival";
import CategorySportsSection from "./views/home/category-sport";
import CategoryLainnyaSection from "./views/home/category-lainnya";
import CategoryDramaSection from "./views/home/category-drama";
import Footer from "./views/footer";
import CategoryDesktop from "./views/home/category-hero-desktop";

const HomePage: React.FC = () => {
  return (
    <section className="">
      <NavbarDesktop />
      <Hero />
      <CategoryDesktop />
      <CategorySection />
      <CategoryFestivalSection />
      <CategorySportsSection />
      <CategorySeminarSection />
      <CategoryDramaSection />
      <CategoryGameSection />
      <CategoryLainnyaSection />
      <Footer />
    </section>
  );
};

export default HomePage;
