import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  image: StaticImageData;
  name: string;
};

const AuthPoster: React.FC<Props> = (props) => {
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
      <div className="absolute inset-0 z-50 mt-48 flex justify-center p-4">
        <div>
          <h1 className="text-center text-[38px] font-semibold text-white">
            Log in to enjoy all the benefits!
          </h1>
          <h1 className=" text-center text-white">
            You only need to enter your cellphone number or email. Easy and
            fast, immediately feel the various conveniences and benefits of our
            services!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AuthPoster;
