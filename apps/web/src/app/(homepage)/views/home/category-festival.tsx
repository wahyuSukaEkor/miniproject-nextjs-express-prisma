"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface ICategoryFestivalSectionProps {}

const CategoryFestivalSection: React.FunctionComponent<
  ICategoryFestivalSectionProps
> = (props) => {
  const [event, setEvent] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    onHandleGet();
  }, []);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const filterEventFestival = event.filter(
    (event: any) => event.categoryId === 1,
  );
  const onHandleGet = async () => {
    try {
      setLoading(true);
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?categoryId=1";
      const response = await axios.get(url);
      setEvent(response.data.result);
      // console.log("HASIL RESPONSE DATA :",response.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="festival">
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">
            Festival
          </h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
          Enjoy the Festival with a 50% Discount! 🎉
          </h1>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="col-span-1">
                  <Skeleton height={288} />
                </div>
              ))
            : filterEventFestival
                .slice(0, displayedEvents)
                .map((event: any, index: number) => (
                  <div key={index}>
                    <CardEvent
                      id={event.id}
                      judul={event.name}
                      lokasi={event.location.name}
                      waktu={event.createdAt}
                      harga={event.price}
                      urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                    />
                  </div>
                ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFestivalSection;
