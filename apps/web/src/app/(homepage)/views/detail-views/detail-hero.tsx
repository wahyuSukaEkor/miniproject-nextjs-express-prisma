"use client";
import * as React from "react";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
interface IHeroDetailsProps {
  data: {
    imageURL: string;
  };
}

const HeroDetails: React.FunctionComponent<IHeroDetailsProps> = (props) => {
  const router = useRouter();
  return (
    <section>
      <div className=" relative">
        <Image
          className="mx-auto flex h-[250px] w-full flex-col bg-cover bg-center md:h-[555px]  md:w-fit"
          src={ props.data.imageURL}
          width={555}
          height={1400}
          alt=""
        />
        <IoIosArrowBack
          onClick={() => router.back()}
          className=" absolute left-2 top-2 h-6 w-6 md:hidden"
        />
      </div>
    </section>
  );
};

export default HeroDetails;
