"use client";
import * as React from "react";
import CardEvent from "../../_components/card-event";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface ICategorySportsSectionProps {}

const CategorySportsSection: React.FunctionComponent<
  ICategorySportsSectionProps
> = (props) => {
  const [event, setEvent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onHandleGet();
  }, []);
  const [displayedEvents, setDisplayedEvents] = React.useState(5);
  const filterEventSports = event.filter(
    (event: any) => event.category_id === 2,
  );
  const onHandleGet = async () => {
    try {
      setLoading(true);
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?category_id=2";
      const response = await axios.get(url);
      setEvent(response.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="sport">
      <div className=" mx-[20px] my-[26px] md:mx-[140px] ">
        <div className=" flex flex-col justify-between">
          <h1 className=" text-[14px] font-semibold md:text-[24px]">Olahraga</h1>
          <h1 className=" mt-[4px] text-[12px] md:mt-[14px] md:text-[14px] ">
          Rasakan adrenaline olahraga seru dan penuh tantangan! 🏅🔥 Siap buktikan kemampuanmu di lapangan?
          </h1>
        </div>
        <div className="my-[18px] flex gap-4 overflow-hidden overflow-x-auto md:grid md:grid-cols-5">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="col-span-1">
                  <Skeleton height={288} />
                </div>
              ))
            : filterEventSports
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

export default CategorySportsSection;
