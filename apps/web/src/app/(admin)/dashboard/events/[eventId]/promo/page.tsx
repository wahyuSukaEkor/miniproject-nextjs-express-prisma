"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardTemplate from "@/app/(admin)/_components/template";

interface IPromoSectionProps {}

const PromoSection: React.FunctionComponent<IPromoSectionProps> = (props) => {
  const id = useParams();
  const [getData, setGetData] = React.useState([]);

  React.useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + `/vouchers/${id.eventId}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${Cookies.get("admin-tkn")}` },
      });

      setGetData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const printTable = () => {
    let print = getData.map((promo: any, index: number) => {
      return (
        <TableRow className="text-left" key={index}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell className="font-medium">
            {promo.name.toUpperCase()}
          </TableCell>
          <TableCell className="font-medium">{promo.discount}</TableCell>
          <TableCell className="font-medium">{promo.maxUsage}</TableCell>
          <TableCell className="font-medium">{promo.usage}</TableCell>
        </TableRow>
      );
    });
    return print;
  };
  return (
    <DashboardTemplate>
      <Link href={`/dashboard/events/${id.eventId}/promo/create`}>
        <Button>Create Promo</Button>
      </Link>
      <Table className=" mt-5 bg-white ">
        <TableHeader className=" text-center">
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Voucher Name</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Max Usage</TableHead>
            <TableHead>Usage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{printTable()}</TableBody>
      </Table>
    </DashboardTemplate>
  );
};

export default PromoSection;
