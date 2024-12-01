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
interface ICategorySeminarSectionProps {}

const CategorySeminarSection: React.FunctionComponent<
  ICategorySeminarSectionProps
> = (props) => {
  const [activeButton, setActiveButton] = React.useState("Online");
  const [getData, setGetData] = React.useState<any>({
    location_id: 0,
  });
  const [event, setEvent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onHandleGet();
  }, [getData]);
  // const [showLoadMoreSeminar, setShowLoadMoreSeminar] = React.useState(true);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const onHandleGet = async () => {
    try {
      setLoading(true);

      let url = NEXT_PUBLIC_BASE_API_URL + "/events?category_id=4";
      if (getData.location_id) {
        url += `&location_id=${getData.location_id}`;
      }
      const response = await axios.get(url);
      setEvent(response.data.result);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const filterEventSeminar = event.filter(
    (event: any) => (event.category_id = 4),
  );
  return (
    <section
      id="seminar"
      className="bg-[url('https://images.unsplash.com/photo-1607969892192-8aa9fe65ee26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]  bg-cover bg-center py-[10px] "
    >
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold text-white md:text-[24px]">
            Workshop
          </h1>
          <h1 className=" mt-[4px] text-[12px] text-white md:mt-[14px] md:text-[14px]">
            Develop Your Skills in Exclusive Workshops! 📚
          </h1>
        </div>
        <div className="mt-[10px] hidden space-x-4 md:block">
          <Button
            className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "All" ? "border-white" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
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
            className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Online" ? "border-white" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
            type="button"
            onClick={(element: any) => {
              const newData = {
                ...getData,
                location_id: 1,
              };
              setGetData(newData);
              setActiveButton("Online");
            }}
          >
            Online
          </Button>
          <Button
            className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Balikpapan" ? "border-white" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
            type="button"
            onClick={(element: any) => {
              const newData = {
                ...getData,
                location_id: 364,
              };
              setGetData(newData);
              setActiveButton("Balikpapan");
            }}
          >
            Balikpapan
          </Button>
          <Button
            className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Denpasar" ? "border-white" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
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
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5 ">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="col-span-1">
                  <Skeleton height={288} />
                </div>
              ))
            : filterEventSeminar
                .slice(0, displayedEvents)
                .map((event: any, index: number) => (
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

export default CategorySeminarSection;
