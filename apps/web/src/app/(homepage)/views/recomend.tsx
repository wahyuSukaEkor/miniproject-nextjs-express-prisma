"use client";
import * as React from "react";
import CardEvent from "@/app/(homepage)/_components/card-event";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface IRecomendProps {}

const Recomend: React.FunctionComponent<IRecomendProps> = (props) => {
  const [loading, setLoading] = React.useState(true);

  const [event, setEvent] = React.useState<any>([]);
  React.useEffect(() => {
    onHandleGet();
  }, []);
  const onHandleGet = async () => {
    try {
      setLoading(true);
      let url = NEXT_PUBLIC_BASE_API_URL + "/events?";
      const response = await axios.get(url);
      setEvent(response.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className=" mt-[10px] rounded-lg bg-white p-[20px] md:px-[28px] md:py-[28px]">
      <div id="stroke" className=" mb-[40px] hidden border md:block"></div>
      <div className=" mt-[10px]">
        <h1 className=" text-[18px] font-semibold md:text-[18px] ">
          Cek ini juga😁👍
        </h1>
      </div>
      <div className="my-[18px] flex gap-2 overflow-hidden overflow-x-auto md:grid md:grid-cols-5 ">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="col-span-1">
                <Skeleton height={288} />
              </div>
            ))
          : event?.slice(0, 5).map((event: any, index: number) => (
              <div key={index}>
                <CardEvent
                  id={event.id}
                  judul={event.event_name}
                  lokasi={event.location.name ? event.location.name : ""}
                  waktu={event.created_at}
                  harga={event.price}
                  urlImage={NEXT_PUBLIC_BASE_API_URL + event.thumbnails_path}
                />
              </div>
            ))}
      </div>
      <div id="stroke" className=" mt-[40px] hidden border md:block"></div>
    </section>
  );
};

export default Recomend;
