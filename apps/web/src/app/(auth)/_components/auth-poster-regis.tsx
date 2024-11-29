import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  image: StaticImageData;
  name: string;
};

const AuthPosterRegis: React.FC<Props> = (props) => {
  const { image, name } = props;

  return (
    <div className="relative hidden min-h-screen w-full lg:block">
      <Image
        src={image}
        alt={name}
        quality={100}
        fill
        placeholder="blur"
        sizes="100vw"
        className="bg-cover"
      />
      <div className="absolute inset-0 z-50 mt-48 flex justify-center p-10">
        <div>
          <h1 className="text-center text-[38px] font-semibold   text-white">
            You can attend events as you wish, but your wallet remains safe!
          </h1>
          <h1 className=" text-center  text-white">
            Create an account to get cheaper prices, extra discounts, & free
            insurance.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AuthPosterRegis;
