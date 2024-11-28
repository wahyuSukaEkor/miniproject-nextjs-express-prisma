"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Cookie from "js-cookie";
import Image from "next/image";
// import { Button } from "@/components/ui/button";

const UnauthorizedPage: React.FC = () => {
  useEffect(() => {
    Cookie.remove("admin-tkn");
    Cookie.remove("user-tkn");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-6 md:space-y-8 bg-gray-50">
      <Image
        className="w-[180px] rounded-md object-contain sm:w-[250px] md:w-[300px] lg:w-[350px]"
        src="/images/unauthorized.webp"
        width={768}
        height={864}
        alt="Unauthorized Access"
        priority
      />
      <h1 className="text-center text-3xl font-bold text-gray-800 md:text-4xl">
        401 Unauthorized
      </h1>
      <p className="text-center text-gray-600 text-sm sm:text-base md:px-16 lg:px-24 xl:px-40">
        You do not have permission to access this page. Please ensure you have
        the correct credentials. If you believe this is an error, try logging in
        again or contact our support team for assistance.
      </p>
      <div className="flex justify-center">
        <Link href="/sign-in">
          <button className="px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 md:px-8 md:py-3 md:text-base">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
