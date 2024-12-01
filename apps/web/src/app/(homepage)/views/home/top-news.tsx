import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";

interface ITopNewsProps {}

const TopNews: React.FunctionComponent<ITopNewsProps> = (props) => {
  return (
    <section className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 py-12">
      <div className="mx-4 md:mx-16 px-6 md:px-10">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-semibold md:text-3xl">Popular Events</h1>
          {/* <h1 className="text-white text-sm md:hidden">Load More</h1> */}
        </div>
        <div className="my-8 md:my-12 flex space-x-4 overflow-hidden scrollbar-hide">
          <CardEventPromo />
          <CardEventPromo />
          <CardEventPromo />
          <CardEventPromo />
        </div>
      </div>
    </section>
  );
};

export default TopNews;
