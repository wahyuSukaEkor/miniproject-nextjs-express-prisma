"use client";
import * as React from "react";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface ICategoryGameSectionProps {}

const CategoryGameSection: React.FunctionComponent<
  ICategoryGameSectionProps
> = (props) => {
  const [event, setEvent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [activeButton, setActiveButton] = React.useState("Online");
  const [getData, setGetData] = React.useState<any>({
    location_id: 0,
  });
  React.useEffect(() => {
    onHandleGet();
  }, [getData]);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const filterEventGame = event.filter((event: any) => event.category_id === 5);
  const onHandleGet = async () => {
    try {
      setLoading(true);
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?category_id=5";
      if (getData.location_id) {
        url += `&location_id=${getData.location_id}`;
      }
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
    <section id="game">
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">Game & E-Sports</h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
          Seru-seruan bareng di dunia game & e-sports! 🕹️🎮 Siap tanding dan jadi juara?
          </h1>
        </div>
        <div className=" flex items-center justify-between">
          <div className="mt-[10px] hidden space-x-4 md:block">
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "All" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  location_id: 0,
                };
                setGetData(newData);
                setActiveButton("All");
              }}
            >
              All
            </Button>
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Jakarta" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  location_id: 158,
                };
                setGetData(newData);
                setActiveButton("Jakarta");
              }}
            >
              Jakarta
            </Button>
            <Button
              className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Denpasar" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
              type="button"
              onClick={(element: any) => {
                const newData = {
                  ...getData,
                  location_id: 283,
                };
                setGetData(newData);
                setActiveButton("Denpasar");
              }}
            >
              Denpasar
            </Button>
          </div>
          <Link href={`/explore`}>
            <Button
              className={`hidden h-fit w-fit rounded-md border  bg-white px-4 text-black hover:bg-[#53b253] hover:text-white md:block`}
              type="button"
            >
              Explore More
            </Button>
          </Link>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="col-span-1">
                  <Skeleton height={288} />
                </div>
              ))
            : filterEventGame
                .slice(0, displayedEvents)
                .map((event: any, index: number) => (
                  <div key={index}>
                    <CardEvent
                      id={event.id}
                      judul={event.event_name}
                      lokasi={event.location.name}
                      waktu={event.created_at}
                      harga={event.price}
                      urlImage={NEXT_PUBLIC_BASE_API_URL + event.thumbnails_path}
                    />
                  </div>
                ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGameSection;
