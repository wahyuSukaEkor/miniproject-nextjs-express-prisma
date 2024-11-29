import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
interface ITopNewsProps {}

const TopNews: React.FunctionComponent<ITopNewsProps> = (props) => {
  return (
    <section>
      <div className=" mx-[20px] my-[10px] md:mx-[140px] md:my-[20px] ">
        <div className=" flex justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">
            Popolar Event
          </h1>
          {/* <h1 className=" text-[12px] md:hidden">Load More</h1> */}
        </div>
        <div className=" my-[18px] flex space-x-[8px] overflow-hidden md:my-[40px] md:space-x-[40px] ">
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
