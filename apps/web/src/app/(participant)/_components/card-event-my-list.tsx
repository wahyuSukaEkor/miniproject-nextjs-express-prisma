import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate, formatPrice, numberShortener } from "@/lib/formatter";
interface ICardEventMyListProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: number;
}

const CardEventMyList: React.FunctionComponent<ICardEventMyListProps> = (
  props,
) => {
  return (
    <Link href={`/detail/${props.id}`}>
      <div
        className="h-[278px] min-w-[178px] max-w-[178px] cursor-pointer overflow-hidden rounded-lg border border-[#f3f3f6] bg-white shadow-md md:h-[288px] md:min-w-[100px]  md:max-w-[236px]"
      >
        <div className="relative h-[144px] w-full md:h-[148px]">
          <Image
            className="flex rounded-t-lg object-top"
            src={props.urlImage}
            alt={props.judul}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="mx-[8px] mt-[8px] flex flex-col md:mx-[12px]">
          <h1 className="  overflow-hidden overflow-ellipsis  whitespace-nowrap text-[12px] font-bold md:text-[14px]">
            {props.judul}
          </h1>
          <h1 className="  mt-[10px]  text-[10px] overflow-hidden overflow-ellipsis  whitespace-nowrap">{props.lokasi}</h1>
          <h1 className="  mt-[4px]  text-[10px] overflow-hidden overflow-ellipsis  whitespace-nowrap">{formatDate(props.waktu)}</h1>
          <h1 className="  mt-[4px]  text-[10px] overflow-hidden overflow-ellipsis  whitespace-nowrap">
            {props.harga === 0 ? "Free" : `${formatPrice(props.harga)}`}
          </h1>
          <h1 className=" mt-[20px] text-[10px]  font-semibold text-green-700 md:text-[12px]   ">
            Payment Successful
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CardEventMyList;
