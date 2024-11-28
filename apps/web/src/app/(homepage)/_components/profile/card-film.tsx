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
interface ICardFilmProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: number;
}

const CardFilm: React.FunctionComponent<ICardFilmProps> = (props) => {
  return (
    <Link href={`/detail/${props.id}`}>
      <div className="h-[278px]  max-w-[178px] cursor-pointer overflow-hidden  rounded-lg  bg-white md:h-[288px]  md:max-w-[236px] shadow-xl">
        <div className="relative h-[278px] w-full md:h-[288px]">
          <Image
            className="rounded-t-lg"
            src={props.urlImage}
            alt={props.judul}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default CardFilm;
