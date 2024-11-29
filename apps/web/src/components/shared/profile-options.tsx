"use client";

import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ProfileOptions: React.FC = () => {
  const router = useRouter();
  const userToken = Cookies.get("user-tkn");
  const adminToken = Cookies.get("admin-tkn");

  const handleSignOut = () => {
    Cookies.remove("user-tkn"); // Hapus cookie saat sign out
    Cookies.remove("admin-tkn"); // Hapus cookie saat sign out
    router.push("/sign-in");
  };
  return (
    <>
      {userToken && (
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/my-event"}>Dashboard</Link>
        </DropdownMenuItem>
      )}
      {adminToken && (
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/dashboard"}>Dashboard</Link>
        </DropdownMenuItem>
      )}

      <DropdownMenuItem
        onClick={handleSignOut}
        className="cursor-pointer text-red-400 focus:text-red-500"
      >
        Logout
      </DropdownMenuItem>
    </>
  );
};

export default ProfileOptions;
