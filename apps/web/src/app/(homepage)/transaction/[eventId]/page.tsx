"use client";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import * as React from "react";
import { FaTicketAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCoins } from "react-icons/fa6";
import DesSection from "../../views/transaction/des-section";
import axios from "axios";
import PaymentSection from "../../views/transaction/payment-section";
import { getUserProfile } from "@/data/user";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  formatDate,
  formatDateTime,
  formatNumber,
  formatPrice,
  numberShortener,
} from "@/lib/formatter";
import { toast } from "sonner";

interface IBayarPageProps {
  points: {
    balance: number;
  };
}

const BayarPage: React.FunctionComponent<IBayarPageProps> = () => {
  const id = useParams();
  const [totalPayment, setTotalPayment] = React.useState<number>(0);
  const [selectedVoucher, setSelectedVoucher] = React.useState<any>(null);
  const [dataProfile, setDataProfile] = React.useState<any[]>([]);
  const [event, setEvent] = React.useState<any>([]);
  const [voucher, setVoucher] = React.useState<any[]>([]);
  const [point, setPoint] = React.useState<number>(0);
  const [switchOn, setSwitchOn] = React.useState<boolean>(false);
  const [creatorVoucher, setCreatorVoucher] = React.useState<any>([]);
  const seatReq = localStorage.getItem(`seat_${id.eventId}`);
  const [selectedVoucherDetails, setSelectedVoucherDetails] =
    React.useState<any>(0);
  const [dataTransaction, setDataTransaction] = React.useState<any>({
    seatRequests: Number(seatReq),
    redeemedPoints: 0,
    eventId: 0,
  });

  React.useEffect(() => {
    setDataTransaction((prev: any) => {
      const updatedTransaction = {
        ...prev,
        eventId: Number(id.eventId),
        redeemedPoints: switchOn ? point : 0,
      };

      if (selectedVoucher !== null) {
        updatedTransaction.voucherId = selectedVoucherDetails.id;
      } else {
        delete updatedTransaction.voucherId;
      }

      return updatedTransaction;
    });
  }, [selectedVoucher, switchOn, point]);

  // Handle getAPi user (data voucher, data point, voucher EO)
  const getApiDetail = async () => {
    try {
      const UserProfile = await getUserProfile(Cookies.get("user-tkn")!);
      let url = NEXT_PUBLIC_BASE_API_URL + `/events/${id.eventId}`;
      const response = await axios.get(url);
      let voucherAfterFilter = [];
      for (let i = 0; i < UserProfile.result.vouchers.length; i++) {
        if (
          UserProfile.result.vouchers[i].usage <
          UserProfile.result.vouchers[i].maxUsage
        ) {
          voucherAfterFilter.push(UserProfile.result.vouchers[i]);
        }
      }
      setEvent({
        ...response.data.result[0],
        startDate: formatDateTime(response.data.result[0].startDate),
      });
      setTotalPayment(
        response.data.result[0].price * dataTransaction.seatRequests,
      );
      setVoucher(voucherAfterFilter);
      setPoint(UserProfile.result.point.balance);
      console.log("TESTING", response.data.result[0]);
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };

  const onHandleVoucher = async () => {
    try {
      //CREATOR
      let creatorUrl =
        NEXT_PUBLIC_BASE_API_URL + `/vouchers/voucher-creator/${id.eventId}`;

      const creatorResponse = await axios.get(creatorUrl);
      let voucherAfterFilterCreator = [];

      for (let i = 0; i < creatorResponse.data.result.length; i++) {
        if (
          creatorResponse.data.result[i].usage <
          creatorResponse.data.result[i].maxUsage
        ) {
          voucherAfterFilterCreator.push(creatorResponse.data.result[i]);
        }
      }
      setCreatorVoucher(voucherAfterFilterCreator);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle Voucher Select
  const handleSelectVoucher = (voucherId: any) => {
    const selected = [...creatorVoucher, ...voucher].find(
      (value) => value.id === Number(voucherId),
    );
    setSelectedVoucher(selected ? Number(voucherId) : null);
    setSelectedVoucherDetails(selected || null);
  };
  // Handle Switch Change
  const handleSwitchChange = () => {
    if (point > 0) {
      setSwitchOn(!switchOn);
    } else {
      toast.error("Sorry, you don't have any point");
    }
  };

  // Handle total Front End
  let discount = selectedVoucherDetails
    ? (totalPayment * selectedVoucherDetails.discount) / 100
    : 0;
  let points =
    point > totalPayment - discount ? totalPayment - discount : point;
  let handlePoint = switchOn ? points : 0;

  React.useEffect(() => {
    getApiDetail();
    onHandleVoucher();
  }, []);

  // handle Post Transaction
  const router = useRouter();
  const ticketBuy = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions`;

      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };
      const response = await axios.post(url, dataTransaction, config);
      localStorage.removeItem("seat");
      toast.success("Successful purchase of tickets");
      router.push("/checkout");
    } catch (error: any) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <section className="  h-[1000px] bg-[#f4f7fe]">
      {/* <NavbarDesktop /> */}
      <div className=" block md:flex">
        <div className=" flex flex-col">
          <DesSection />
          <div className="mx-[10px] md:mx-0">
            <div className="ml-0 mt-[20px] h-auto w-full rounded-lg  bg-white shadow md:ml-[120px] md:h-auto md:w-[828px] md:px-[28px] md:py-[28px]">
              <div className="  flex justify-between">
                <Select onValueChange={(e) => handleSelectVoucher(e)}>
                  <SelectTrigger className="w-full md:w-[1000px]">
                    <div className=" flex space-x-4">
                      <FaTicketAlt className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                      <p className=" text-[12px] text-gray-500">
                        Use vouchers to save more 👍
                      </p>
                    </div>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {creatorVoucher.length === 0 && voucher.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        You have no vouchers available.
                      </div>
                    ) : (
                      <>
                        {creatorVoucher.map((voucher: any, index: number) => (
                          <SelectItem key={index} value={voucher.id}>
                            {voucher.name.toUpperCase()}
                          </SelectItem>
                        ))}
                        {voucher.map((voucher: any, index: number) => (
                          <SelectItem key={index} value={voucher.id}>
                            {voucher.name.toUpperCase()}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* <RedeemPointSection /> */}
          <div className="mx-[10px] md:mx-0">
            <div className="ml-0 mt-[20px] w-full rounded-lg bg-white p-3 shadow md:ml-[120px] md:h-auto md:w-[828px] md:p-0 md:px-[28px] md:py-[28px]">
              <div className=" flex justify-between ">
                <div className=" flex items-center space-x-4">
                  <FaCoins className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                  <p className=" text-[12px] text-gray-500">
                    Redeem Point : {formatPrice(point)}
                  </p>
                </div>
                <Switch
                  checked={switchOn}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
          </div>
          <PaymentSection />
        </div>
        {/* <DetailOrder /> */}
        <div className=" relative mx-[10px] flex flex-col pb-[11vh] md:mx-0 md:pb-0">
          <div className="ml-0 mt-[24px] h-auto w-full rounded-lg bg-white  p-[20px] shadow md:fixed md:ml-[48px]  md:h-auto md:w-[392px]">
            <div className=" flex">
              {event.imageURL && (
                <Image
                  className="h-[40px] w-[40px] rounded-md "
                  src={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                  width={236}
                  height={148}
                  alt=""
                />
              )}
              <div className="flex items-center overflow-hidden  overflow-ellipsis whitespace-nowrap px-2">
                <p className=" text-[14px] font-semibold">{event.name}</p>
              </div>
            </div>
            <div id="stroke" className=" mt-[10px] border"></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>REGULAR</h1>
              <h1 className="text-[14px] text-black">
                {dataTransaction.seatRequests} Ticket
              </h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Event date</h1>
              <h1 className="text-[14px] text-black">{event.startDate}</h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Total Discount</h1>
              <h1 className="text-[14px] text-black">
                {formatPrice(discount)}
              </h1>
            </div>
            <div id="stroke" className=" border "></div>
            <div className="my-[24px] space-y-3  text-[12px] text-gray-800">
              <h1>Total Points used</h1>
              <h1 className="text-[14px] text-black">
                {formatPrice(handlePoint)}{" "}
              </h1>
            </div>
            <div id="stroke" className=" mb-10 border "></div>
            <div className=" my-[16px] flex justify-between  text-[12px] text-gray-800">
              <p className=" font-semibold">Total payment</p>
              <p className=" text-[16px] font-semibold">
                {formatPrice(totalPayment - discount - handlePoint)}
              </p>
            </div>
            <div>
              <Button
                className="hidden h-[36px] w-full rounded-md  bg-[#53B253]  text-white md:block"
                type="button"
                onClick={ticketBuy}
              >
                Buy ticket
              </Button>
            </div>
          </div>
        </div>
        {/* <DetailOrder /> */}
        <div className=" fixed  bottom-0  h-[10vh] w-full bg-gradient-to-r from-white to-lime-500  md:hidden ">
          <h1 className=" text-center text-[12px]  font-semibold text-[#007cff]">
            Use vouchers to save more 👍
          </h1>
          <Button
            className=" h-[8vh] w-full  bg-[#53B253]  text-white md:hidden"
            type="button"
            onClick={ticketBuy}
          >
            Buy ticket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BayarPage;
