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
interface ICategoryMusikSectionProps {}

const CategoryMusikSection: React.FunctionComponent<
  ICategoryMusikSectionProps
> = (props) => {
  const [event, setEvent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [activeButton, setActiveButton] = React.useState("Online");
  const [getData, setGetData] = React.useState<any>({
    locationId: 0,
  });
  React.useEffect(() => {
    onHandleGet();
  }, [getData]);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const filterEventMusik = event.filter((event: any) => event.categoryId === 2);
  const onHandleGet = async () => {
    try {
      setLoading(true);
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?categoryId=2";
      if (getData.locationId) {
        url += `&locationId=${getData.locationId}`;
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
    <section id="music">
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">Concert</h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
            Rock out with your favorite musicians at the hottest concert of the
            year🎸
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
                  locationId: 0,
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
                  locationId: 158,
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
                  locationId: 283,
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
            : filterEventMusik
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

export default CategoryMusikSection;
