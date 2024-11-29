"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import ButtonBeliDes from "../../_components/detail/button-buy-des";
import ButtonBeliMobile from "../../_components/detail/button-buy-mobile";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";

interface ITicketProps {
  id: number;
  data: {
    id: number;
    price: number;
    availableSeats: number;
    maxCapacity: number;
  };
}

const Ticket: React.FunctionComponent<ITicketProps> = (props) => {
  //GLOBAL STATE
  const dispatch = useAppDispatch();
  // dispatch(setSuccesLoginAction(response.data[0]));
  const [jumlahTiket, setJumlahTiket] = React.useState(1);

  const countHarga = (counter: string) => {
    if (counter === "+") {
      return setJumlahTiket((state) => state + 1);
    } else {
      return setJumlahTiket((state) => (state - 1 === 0 ? 1 : state - 1));
    }
  };
  return (
    <section className=" mt-[10px]">
      <div className="mx-[0px] h-auto w-full rounded-lg bg-white p-[20px] md:mx-[120px] md:h-[300] md:w-[784px] md:bg-[#f4f7fe] md:px-[28px] md:py-[28px]">
        <div className="mx-0  ">
          <h1 className="text-[18px] font-semibold md:text-[18px]">
            Pilih tiket
          </h1>
          <div className="my-[20px] h-full w-full rounded-xl border border-slate-400 bg-white px-[28px] py-[20px] md:my-[32px] md:h-[210px] md:w-[704px]">
            <div className=" flex justify-between text-[14px] md:text-[14px]">
              <h1 className=" font-semibold">REGULAR</h1>
              <h1 className=" text-[14px] ">Jumlah Tiket</h1>
            </div>
            <div className=" mt-[10px] flex justify-end space-x-4   text-[14px] md:space-x-10 md:text-[16px]">
              <Button
                className=" h-[24px] w-[24px]  rounded-2xl border border-gray-400 bg-white text-black"
                type="button"
                onClick={() => countHarga("-")}
              >
                -
              </Button>
              <p className=" text-[14px]">{jumlahTiket}</p>
              <Button
                className=" h-[24px] w-[24px]  rounded-2xl border border-gray-400 bg-white text-black"
                type="button"
                onClick={() => countHarga("+")}
              >
                +
              </Button>
            </div>
            <div className="">
              <h1 className=" text-[14px] md:text-[14px]">Price</h1>
              <h1 className=" text-[18px] font-semibold text-[#FFA24B] md:text-[16px]">
                IDR. {props.data.price * jumlahTiket}
              </h1>
            </div>
            <div
              id="stroke"
              className=" mt-[10px] border-[0.2px] md:border"
            ></div>
            <div className=" flex items-center justify-between py-[18px] text-[14px] md:text-[14px]">
              <p>
                Available Seat : {props.data.availableSeats} /{" "}
                {props.data.maxCapacity}
              </p>
              <Link href={`/transaction/${props.id}`}>
                <ButtonBeliDes />
              </Link>
            </div>
          </div>
          <div className=" mx-[28px] md:hidden ">
            <Link href={`/transaction/${props.id}`}>
              <ButtonBeliMobile />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
