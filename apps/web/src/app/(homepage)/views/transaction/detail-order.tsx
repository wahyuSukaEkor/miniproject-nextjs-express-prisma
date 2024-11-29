import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Image from "next/image";

interface IDetailOrderProps {}

const DetailOrder: React.FunctionComponent<IDetailOrderProps> = (props) => {
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
      setEvent(response.data.result[0]);
    } catch (err) {
      console.log("Error fetching event data:", err);
    }
  };
  return (
    <section className="mx-[10px] md:mx-0">
      <div className=" relative flex flex-col">
        <div className="ml-0 mt-[24px] h-auto w-full rounded-lg bg-white  p-[20px] shadow md:fixed md:ml-[48px]  md:h-auto md:w-[392px]">
          <div className=" flex">
          <Image
          className="h-[40px] w-[40px] rounded-md "
          src={event.imageURL}
          width={236}
          height={148}
          alt=""
        />
            <div className="flex items-center overflow-hidden  overflow-ellipsis whitespace-nowrap px-2">
              <p className=" text-[14px] font-semibold">{event.name}</p>
            </div>
          </div>
          <div id="stroke" className=" mt-[10px] border"></div>
          <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
            <h1>REGULAR</h1>
            <h1 className="text-[14px] text-black">1 Tiket</h1>
          </div>
          <div id="stroke" className=" border "></div>
          <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
            <h1>Tanggal dipilih</h1>
            <h1 className="text-[14px] text-black">{event.startDate}</h1>
          </div>
          <div id="stroke" className=" border "></div>
          <div className=" my-[16px] flex justify-between  text-[12px] text-gray-800">
            <p className=" font-semibold">Total Pembayaran</p>
            <p className=" text-[16px] font-semibold">IDR. {event.price}</p>
          </div>
          <div>
            <Button
              className="hidden h-[36px] w-full rounded-md  bg-[#53B253]  text-white md:block"
              type="button"
            >
              Beli Tiket
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default DetailOrder;
