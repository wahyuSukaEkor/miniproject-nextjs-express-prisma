import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  formatDate,
  numberShortener,
  formatNumber,
  formatPrice,
} from "@/lib/formatter";
interface ICardEventProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: number;
}

const CardEvent: React.FunctionComponent<ICardEventProps> = (props) => {
  return (
    <Link href={`/detail/${props.id}`}>
      <div className="h-[278px] min-w-[178px] max-w-[178px] cursor-pointer overflow-hidden rounded-lg border border-[#f3f3f6] bg-white shadow-md md:h-[288px] md:min-w-[100px]  md:max-w-[236px]">
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
          <h1 className="  mt-[10px]  overflow-hidden overflow-ellipsis whitespace-nowrap  text-[10px]">
            {props.lokasi}
          </h1>
          <h1 className="  mt-[4px]  overflow-hidden overflow-ellipsis whitespace-nowrap  text-[10px]">
            {formatDate(props.waktu)}
          </h1>
          <h1 className="  mt-[20px] overflow-hidden overflow-ellipsis whitespace-nowrap  text-[10px] font-semibold  text-[#53B253] md:mt-[20px] md:text-[12px]">
            Available now
          </h1>
          <h1 className="  overflow-hidden overflow-ellipsis whitespace-nowrap   text-[10px] font-semibold md:text-[12px]">
            {props.harga === 0 ? "Free" : `${formatPrice(props.harga)}`}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CardEvent;
