"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CardEventPromo from "../../_components/home/card-event-promo";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ICategoryAttractionSectionProps {}

const CategoryAttractionSection: React.FunctionComponent<ICategoryAttractionSectionProps> = (props) => {
  const [activeButton, setActiveButton] = React.useState("Online");
  const [getData, setGetData] = React.useState<any>({
    location_id: 0,
  });
  const [event, setEvent] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onHandleGet();
  }, [getData]);

  const [showLoadMoreAttraction, setShowLoadMoreAttraction] = React.useState(true);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);

  const onHandleGet = async () => {
    try {
      setLoading(true);
      let url = NEXT_PUBLIC_BASE_API_URL + `/events?category_id=6`;
      if (getData.location_id) {
        url += `&location_id=${getData.location_id}`;
      }
      const response = await axios.get(url);
      setEvent(response.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filterEventAttraction = event.filter((event: any) => event.category_id === 6);

  return (
    <section
      id="attraction"
      className="bg-[url('https://cdn.pixabay.com/photo/2022/06/02/15/01/music-7238254_1280.jpg')] bg-cover bg-center py-[10px]"
    >
      <div className="mx-[20px] my-[26px] md:mx-[140px]">
        <div className="flex flex-col justify-between">
          <h1 className="text-[14px] font-semibold text-white md:text-[24px]">Attraction</h1>
          <h1 className="mt-[4px] text-[12px] text-gray-300 md:mt-[14px] md:text-[14px]">
            Exciting Adventures Await Around Every Corner! 🎡
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-[10px] hidden space-x-4 md:block">
            <Button
              className={`h-[30px] w-auto border bg-gray-800 px-4 ${activeButton === "Online" ? "border-teal-500" : "border-gray-600"} rounded-md text-white hover:bg-teal-600 hover:text-white`}
              type="button"
              onClick={() => {
                const newData = { ...getData, location_id: 0 };
                setGetData(newData);
                setActiveButton("Online");
              }}
            >
              All
            </Button>
            <Button
              className={`h-[30px] w-auto border bg-gray-800 px-4 ${activeButton === "Surabaya" ? "border-teal-500" : "border-gray-600"} rounded-md text-white hover:bg-teal-600 hover:text-white`}
              type="button"
              onClick={() => {
                const newData = { ...getData, location_id: 265 };
                setGetData(newData);
                setActiveButton("Surabaya");
              }}
            >
              Surabaya
            </Button>
            <Button
              className={`h-[30px] w-auto border bg-gray-800 px-4 ${activeButton === "Balikpapan" ? "border-teal-500" : "border-gray-600"} rounded-md text-white hover:bg-teal-600 hover:text-white`}
              type="button"
              onClick={() => {
                const newData = { ...getData, location_id: 364 };
                setGetData(newData);
                setActiveButton("Balikpapan");
              }}
            >
              Balikpapan
            </Button>
          </div>
          <Link href={`/explore`}>
            <Button
              className="hidden h-fit w-fit rounded-md border bg-gray-800 px-4 text-white hover:bg-teal-600 hover:text-white md:block"
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
            : filterEventAttraction.slice(0, displayedEvents).map((event: any, index: number) => (
                <div key={index}>
                  <CardEvent
                    id={event.id}
                    judul={event.event_name}
                    lokasi={event.location.name}
                    waktu={event.end_date}
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

export default CategoryAttractionSection;
