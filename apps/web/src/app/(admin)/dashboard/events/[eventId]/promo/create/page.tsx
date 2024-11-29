"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardTemplate from "@/app/(admin)/_components/template";
import { toast } from "sonner";

interface ICreatePromoSectionProps {}

const CreatePromoSection: React.FunctionComponent<ICreatePromoSectionProps> = (
  props,
) => {
  const router = useRouter();

  const [dataDiscount, setDataDiscount] = React.useState<any>({
    name: "",
    maxUsage: 0,
    discount: 0,
  });

  const id = useParams();

  React.useEffect(() => {}, [dataDiscount]);

  const postVoucher = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + "/vouchers";
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("admin-tkn")}` },
      };
      const response = await axios.post(
        url,
        {
          name: dataDiscount.name,
          maxUsage: dataDiscount.maxUsage,
          discount: dataDiscount.discount,
          eventId: Number(id.eventId),
        },
        config,
      );
      toast.success("Successful create a promo!");
      router.push(`/dashboard/events/${id.eventId}/promo`);
    } catch (error: any) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
  };

  return (
    <DashboardTemplate>
      <section className="flex h-fit w-full justify-center ">
        <Card className="flex max-w-md p-6">
          <CardHeader>
            <CardTitle>Create Promo</CardTitle>
            <CardDescription>
              Fill out the details below to create an exciting promotion for
              your customers. Customize your offer, set the terms, and attract
              more engagement!
            </CardDescription>
            <CardContent>
              <div className=" mt-4 space-y-4">
                <div>
                  <h4>Discount Name</h4>
                  <Input
                    placeholder="NGIVENT BULAN RAMADHAN 20%"
                    onChange={(element: any) => {
                      const newData = {
                        ...dataDiscount,
                        name: element.target.value,
                      };
                      setDataDiscount(newData);
                    }}
                  />
                </div>
                <div>
                  <h4>Max Usage</h4>
                  <Input
                    placeholder="30"
                    onChange={(element: any) => {
                      const newData = {
                        ...dataDiscount,
                        maxUsage: Number(element.target.value),
                      };
                      setDataDiscount(newData);
                    }}
                  />
                </div>
                <div>
                  <h4>
                    Discount <span className=" text-[8px]">dalam persen</span>
                  </h4>
                  <Input
                    placeholder="30"
                    onChange={(element: any) => {
                      const newData = {
                        ...dataDiscount,
                        discount: Number(element.target.value),
                      };
                      setDataDiscount(newData);
                    }}
                  />
                </div>
                <div>
                  <Button className=" w-full" onClick={postVoucher}>
                    Create Promo
                  </Button>
                </div>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </section>
    </DashboardTemplate>
  );
};
export default CreatePromoSection;
