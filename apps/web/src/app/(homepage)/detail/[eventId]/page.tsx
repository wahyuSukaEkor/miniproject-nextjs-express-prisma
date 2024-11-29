"use client";
import * as React from "react";
import NavbarDesktop from "../../views/navbar-desktop";
import Recomend from "../../views/recomend";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BiBookmarks } from "react-icons/bi";
import { MdGroups3 } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/formatter";
import { toast } from "sonner";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface IDetailEventProps {
  thumbnails_path: string;
}

const DetailEvent: React.FunctionComponent<IDetailEventProps> = (props) => {
  //TIKET
  const [jumlahTiket, setJumlahTiket] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  //BANTUAN
  const router = useRouter();
  const [event, setEvent] = React.useState<any>([]);
  const id = useParams();

  // HANDLE GLOBAL
  const [transaction, setTransaction] = React.useState<any>({
    seatRequests: 1,
    redeemedPoints: 0,
    eventId: 0,
    voucherId: 0,
  });
  React.useEffect(() => {
    getEventById();
  }, []);

  const countHarga = (counter: string) => {
    setTransaction((previewTransaction: any) => {
      const currentQuantity = parseInt(previewTransaction.seatRequests, 10);

      const newQuantity =
        counter === "+" ? currentQuantity + 1 : currentQuantity - 1;

      if (newQuantity > event.limitCheckout) {
        return previewTransaction;
      }
      const newQuantityString = (newQuantity < 1 ? 1 : newQuantity).toString();

      return {
        ...previewTransaction,
        seatRequests: newQuantityString,
        redeemedPoints: 0,
        eventId: 0,
        voucherId: 0,
      };
    });
  };

  const getEventById = async () => {
    try {
      setLoading(true);
      let url = NEXT_PUBLIC_BASE_API_URL + `/events/${id.eventId}`;
      const response = await axios.get(url);
      setEvent(response.data.result[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatReq = async () => {
    localStorage.setItem(`seat_${id.eventId}`, transaction.seatRequests);
  };

  return (
    <section className="bg-[#f4f7fe] md:bg-white ">
      <NavbarDesktop />
      {/* HERO */}
      <div className=" relative">
        {loading ? (
          <Skeleton height={555} width="100%" />
        ) : (
          <Image
            className="mx-auto flex h-[250px]  flex-col object-cover bg-center md:h-[555px]  md:w-fit"
            src={NEXT_PUBLIC_BASE_API_URL + event.thumbnails_path}
            width={555}
            height={1400}
            alt=""
          />
        )}
        <IoIosArrowBack
          onClick={() => router.back()}
          className=" absolute left-2 top-2 h-6 w-6 md:hidden"
        />
      </div>
      {/* DESKRIPSI ACARA */}
      <div className="relative top-[-40px] mx-[10px] mt-[24px] h-auto w-[360px] rounded-lg border bg-white  p-[20px] shadow md:static md:mx-auto md:w-[690PX] md:border-none md:px-[28px] md:py-[28px]  md:shadow-none ">
        <h1 className="text-center text-[22px] font-semibold md:text-left md:text-[18px]">
          {loading ? <Skeleton width={800} /> : event.name}
        </h1>
        <div className=" mt-[10px] space-y-[14px]">
          <div className=" flex items-center">
            <IoLocationSharp className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px]  text-[14px] md:text-[14px]">
              {loading ? <Skeleton width={150} /> : event.location?.name}
            </p>
          </div>
          <div className=" flex items-center">
            <MdOutlineDateRange className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px]  text-[14px] md:text-[14px]">
              {loading ? <Skeleton width={100} /> : formatDate(event.start_date)}
            </p>
          </div>
          <div className=" flex items-center">
            <BiBookmarks className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px]  text-[14px] md:text-[14px]">
              {loading ? <Skeleton width={100} /> : event.category?.name}
            </p>
          </div>
          <div className=" flex items-center">
            <MdGroups3 className=" h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className="mx-[12px]  text-[14px] md:text-[14px]">
              Hosted by :{" "}
              <span className=" font-semibold">
                {loading ? <Skeleton width={100} /> : event.user?.username}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* DESKRIPSI ACARA */}
      <div className="mx-[0px] h-[300] w-full rounded-lg bg-white p-[20px] md:mx-auto md:mt-[10px] md:w-[700px]  md:px-[28px] md:py-[28px]">
        <div className=" ">
          <h1 className="text-[18px]  font-semibold ">Description</h1>
          <p className="mt-[12px] text-justify text-[14px] md:mt-[10px] md:text-[14px]">
            {loading ? <Skeleton count={5} /> : event.description}
          </p>
        </div>
      </div>
      {/* TIKETING */}
      <div className="mx-[0px] h-auto w-full rounded-lg bg-white p-[20px] md:mx-auto md:h-[300] md:w-fit md:bg-[#f4f7fe] md:px-[28px] md:py-[28px]">
        <div className="mx-0  ">
          <h1 className="text-[18px] font-semibold md:text-[18px]">
            Select a ticket
          </h1>
          <div className="my-[20px] h-full w-full rounded-xl border border-slate-400 bg-white px-[28px] py-[20px] md:my-[32px] md:h-[210px] md:w-[704px]">
            <div className=" flex justify-between text-[14px] md:text-[14px]">
              <h1 className=" font-semibold">REGULAR</h1>
              <h1 className=" text-[14px] ">Number of Tickets</h1>
            </div>
            <div className=" mt-[10px] flex justify-end space-x-4   text-[14px] md:space-x-10 md:text-[16px]">
              <Button
                className=" h-[24px] w-[24px]  rounded-2xl border border-gray-400 bg-white text-black"
                type="button"
                onClick={() => countHarga("-")}
              >
                -
              </Button>
              <p className=" text-[14px]">{transaction.seatRequests}</p>
              <Button
                className=" h-[24px] w-[24px]  rounded-2xl border border-gray-400 bg-white text-black"
                type="button"
                onClick={() => {
                  if (
                    parseInt(transaction.seatRequests) < event.limitCheckout
                  ) {
                    countHarga("+");
                  } else {
                    toast.error(
                      `Sorry, transactions at this event are only for purchasing ${event.limitCheckout} tickets`,
                    );
                  }
                }}
              >
                +
              </Button>
            </div>
            <div className="">
              <h1 className="text-[14px] md:text-[14px]">Price</h1>
              <h1 className="text-[18px] font-semibold text-[#FFA24B] md:text-[16px]">
                {formatPrice(event.price * transaction.seatRequests)}
              </h1>
            </div>
            <div
              id="stroke"
              className=" mt-[10px] border-[0.2px] md:border"
            ></div>
            <div className=" flex items-center justify-between py-[18px] text-[14px] md:text-[14px]">
              <p>
                Available Seat : {event.availableSeats} / {event.maxCapacity}
              </p>
              <Link href={`/transaction/${id.eventId}`}>
                <Button
                  className="hidden h-[36px] w-[136px] rounded-md  bg-[#53B253]  text-white md:block"
                  type="button"
                  onClick={handleSeatReq}
                >
                  Buy Ticket
                </Button>
              </Link>
            </div>
          </div>
          <div className=" mx-[28px] md:hidden ">
            <Link href={`/transaction/${id.eventId}`}>
              <Button
                className="block h-[40px] w-full rounded-md  bg-[#53B253]  text-white md:hidden"
                type="button"
                onClick={handleSeatReq}
              >
                Buy Ticket
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-0 md:mx-[120px]">
        <Recomend />
      </div>
    </section>
  );
};
export default DetailEvent;
