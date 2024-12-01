import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ICardSearchProps {
  id?: number;
  gambar?: string;
  judul: string;
  lokasi: string;
  imageURL: string;
}

const CardSearch: React.FunctionComponent<ICardSearchProps> = (props) => {
  const router = useRouter();

  return (
    <div
      className="flex h-[68px] min-w-[306px] max-w-[306px] cursor-pointer overflow-hidden rounded-lg border border-gray-400 bg-white p-[12px] md:min-w-[306px] md:max-w-[306px] hover:shadow-lg transition-all"
      onClick={() => router.push(`/detail/${props.id}`)}
    >
      <Image
        className="w-[40px] h-[40px] rounded-full object-cover"
        src={props.imageURL}
        width={40}
        height={40}
        alt="Event Image"
      />
      <div className="mx-[6px] max-w-[236px]">
        <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[12px] font-bold md:text-[14px]">
          {props.judul}
        </h1>
        <h1 className="text-[10px] text-gray-500">{props.lokasi}</h1>
      </div>
    </div>
  );
};

export default CardSearch;
