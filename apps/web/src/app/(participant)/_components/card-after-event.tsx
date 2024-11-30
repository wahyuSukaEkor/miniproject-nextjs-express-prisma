import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ButtonBeliDes from "@/app/(homepage)/_components/detail/button-buy-des";
import { formatDate, formatPrice, numberShortener } from "@/lib/formatter";
import { FaStar } from "react-icons/fa";

interface ICardBeforeReviewProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: number;
  feedbacks: any;
  reviews?: any;
  rating: any;
}

const CardBeforeReview: React.FunctionComponent<ICardBeforeReviewProps> = (
  props,
) => {
  return (
    <div
      className="h-[288px] min-w-[178px] max-w-[178px] cursor-pointer overflow-hidden rounded-lg border border-[#f3f3f6] bg-white shadow-md md:h-[298px] md:min-w-[100px]  md:max-w-[236px]"
      // onClick={() => router.push(`/detail/${props.id}`)}
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
        <h1 className="  mt-[10px]  overflow-hidden overflow-ellipsis whitespace-nowrap  text-[10px]">
          {props.lokasi}
        </h1>
        <h1 className="  mt-[4px]  overflow-hidden overflow-ellipsis whitespace-nowrap  text-[10px]">
          {formatDate(props.waktu)}
        </h1>
        <h1 className="  mt-[4px]  overflow-hidden overflow-ellipsis whitespace-nowrap  text-[10px]">
          {props.harga === 0 ? "Free" : `${formatPrice(props.harga)}`}
        </h1>
        {/* <Link href={`/review/${props.id}`}>
          <Button className="mt-[10px] w-full text-[12px]">Review</Button>
        </Link> */}
        {props.feedbacks.length === 1 ? (
          <div className=" mt-6 flex   items-center space-x-2 text-[14px]">
            <FaStar className=" text-yellow-400" />
            <p className=" text-[12px]">{props.rating}/5</p>
          </div>
        ) : (
          <Link href={`/review/${props.id}`}>
            <Button className="mt-[10px] w-full text-[12px]">Review</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardBeforeReview;
