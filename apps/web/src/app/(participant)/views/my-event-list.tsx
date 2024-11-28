"use client";
import * as React from "react";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import CardEventMyList from "../_components/card-event-my-list";
import CardBeforeReview from "../_components/card-after-event";
import { getUserProfile } from "@/data/user";
import Cookies from "js-cookie";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IMyEventListProps {}

const MyEventList: React.FunctionComponent<IMyEventListProps> = (props) => {
  const [event, setEvent] = React.useState([]);
  const [eventFinish, setEventFinish] = React.useState([]);
  const [showOnGoing, setShowOnGoing] = React.useState(true);

  React.useEffect(() => {
    onHandleGetOnGoing();
    onHadnleGetFInish();
  }, [showOnGoing]);
  const onHandleGetOnGoing = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };

      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions/success`;
      const response = await axios.get(url, config);

      setEvent(response.data.result);
      console.log("data event Success", response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const onHadnleGetFInish = async () => {
    try {
      // Handle  Token
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };
      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions/finish`;

      const response = await axios.get(url, config);
      setEventFinish(response.data.result);
      console.log("data event Finish", response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowOnGoing = () => {
    setShowOnGoing(true);
  };

  const handleShowCompleted = () => {
    setShowOnGoing(false);
  };
  return (
    <section>
      <div className="mx-10 flex justify-evenly">
        <button onClick={handleShowOnGoing} className={`font-semibold ${showOnGoing ? "text-blue-400" : "text-black"}`}>
          On Going
        </button>
        <button onClick={handleShowCompleted} className={`font-semibold ${!showOnGoing ? "text-blue-400" : "text-black"}`}>
          Finished
        </button>
      </div>
      <div className="my-[18px] grid grid-cols-2 gap-4 md:mx-10 md:grid-cols-4  md:p-6">
        {showOnGoing ? (
          event.length === 0 ? (
            <div className="col-span-2 flex h-[500px] flex-col items-center justify-center space-y-5 rounded-md bg-gray-200 italic md:col-span-5">
              <p>Transaction Not Found</p>
              <div className=" text-center ">
                <Link href="/explore">
                  <Button className=" w-fit hover:bg-[#53b253] md:px-8">
                    Let`s Explore
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            event?.map((eventItem: any, index: number) => (
              <div key={index}>
                <CardEventMyList
                  id={eventItem.id}
                  judul={eventItem.name}
                  lokasi={eventItem.location.name}
                  waktu={eventItem.endDate}
                  harga={eventItem.discountedAmount ?? eventItem.originalAmount}
                  urlImage={NEXT_PUBLIC_BASE_API_URL + eventItem.imageURL}
                />
              </div>
            ))
          )
        ) : eventFinish.length === 0 ? (
          <div className="col-span-2 flex h-[500px] flex-col items-center justify-center space-y-5 rounded-md bg-gray-200 italic md:col-span-5">
            <p>Transaction Not Found</p>
            <div className=" text-center ">
              <Link href="/explore">
                <Button className=" w-fit hover:bg-[#53b253] md:px-8">
                  Let`s Explore
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          eventFinish?.map((eventFinishItem: any, index: number) => (
            <div key={index}>
              <CardBeforeReview
                id={eventFinishItem.id}
                judul={eventFinishItem.name}
                lokasi={eventFinishItem.location.name}
                waktu={eventFinishItem.endDate}
                harga={
                  eventFinishItem.discountedAmount ??
                  eventFinishItem.originalAmount
                }
                urlImage={NEXT_PUBLIC_BASE_API_URL + eventFinishItem.imageURL}
                feedbacks={eventFinishItem.feedbacks}
                rating={eventFinishItem.feedbacks[0]?.rating}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyEventList;
