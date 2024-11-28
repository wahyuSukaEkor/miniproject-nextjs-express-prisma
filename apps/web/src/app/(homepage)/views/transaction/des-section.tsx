"use client";
import * as React from "react";
interface IDesSectionProps {}
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiBookmarks } from "react-icons/bi";
import { MdGroups3 } from "react-icons/md";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate } from "@/lib/formatter";
const DesSection: React.FunctionComponent<IDesSectionProps> = (props) => {
  const [event, setEvent] = React.useState<any>([]);
  const [eventId, setRventId] = React.useState<string>(
    window.location.href.split("/")[4],
  );
  React.useEffect(() => {
    getApiDetail();
  }, []);

  //Handle Get API Detail :
  const getApiDetail = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + `/events/${eventId}`;
      const response = await axios.get(url);
      setEvent({
        ...response.data.result[0],
        startDate: formatDate(response.data.result[0].startDate),
      });
    } catch (err) {
      console.log("Error fetching event data:", err);
    }
  };

  return (
    <section className="mx-[10px] md:mx-0">
      <div className="  mx-[10px] mt-[24px] space-y-2  md:ml-[120px]">
        <h1 className=" text-[18px] font-bold ">Payment Process</h1>
        <p className=" text-[14px] text-gray-500">
          Final Steps Before Enjoying Your Event🔥
        </p>
      </div>
      <div className="  mt-[24px] h-auto w-full rounded-lg bg-white p-[20px]   shadow md:static md:ml-[120px] md:w-[828px] md:px-[28px] md:py-[28px] ">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{event.name}</AccordionTrigger>
            <AccordionContent>
              <div className=" mt-[10px] space-y-[14px]">
                <div className=" flex items-center">
                  <IoLocationSharp className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                  <p className="mx-[12px] text-[14px] md:mx-[30px] md:text-[12px]">
                    {event.location?.name}
                  </p>
                </div>
                <div className=" flex items-center">
                  <MdOutlineDateRange className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                  <p className="mx-[12px] text-[14px] md:mx-[30px] md:text-[12px]">
                    {event.startDate}
                  </p>
                </div>
                <div className=" flex items-center">
                  <BiBookmarks className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                  <p className="mx-[12px] text-[14px] md:mx-[30px] md:text-[12px]">
                    {event.category?.name}
                  </p>
                </div>
                <div className=" flex items-center">
                  <MdGroups3 className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                  <p className="mx-[12px] text-[14px] md:mx-[30px] md:text-[12px]">
                    Hosted by :{" "}
                    <span className=" font-semibold">
                      {event.user?.username}
                    </span>
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default DesSection;
