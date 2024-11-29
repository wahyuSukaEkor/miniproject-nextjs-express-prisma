import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonBeliDes from "@/app/(homepage)/_components/detail/button-buy-des";
import { formatDate, formatPrice, numberShortener } from "@/lib/formatter";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import Cookies from "js-cookie";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
interface ICardCheckoutProps {
  id?: number;
  urlImage: string;
  judul: string;
  lokasi: string;
  waktu: string;
  harga: number;
}

const CardCheckout: React.FunctionComponent<ICardCheckoutProps> = (props) => {
  const [fileName, setFileName] = React.useState<File | null>(null);
  const [transactionsId, setTransactionsId] = React.useState(0);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  const onHandleCheckout = async () => {
    try {
      const formData = new FormData();
      if (fileName) {
        formData.append("image", fileName);
      }
      let url = NEXT_PUBLIC_BASE_API_URL + `/transactions/${props.id}`;

      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("user-tkn")}` },
      };

      const response = await axios.patch(url, formData, config);
      toast.success("Payment Success");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  console.log(props.id);

  return (
    <div className="h-[288px] min-w-[178px] max-w-[178px] cursor-pointer overflow-hidden rounded-lg border border-[#f3f3f6] bg-white shadow-md md:h-[298px] md:min-w-[100px]  md:max-w-[236px]">
      <div className="relative h-[144px] w-full md:h-[148px]">
        <Image
          className="flex rounded-t-lg object-top"
          src={props.urlImage}
          alt={props.judul}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="mx-[8px] mt-[8px] flex flex-col md:mx-[12px]">
        <h1 className="  overflow-hidden overflow-ellipsis  whitespace-nowrap text-[12px] font-bold md:text-[14px]">
          {props.judul}
        </h1>
        <h1 className="  mt-[10px]  text-[10px] overflow-hidden overflow-ellipsis  whitespace-nowrap">{props.lokasi}</h1>
        <h1 className="  mt-[4px]  text-[10px] overflow-hidden overflow-ellipsis  whitespace-nowrap">{formatDate(props.waktu)}</h1>
        <h1 className="  mt-[4px]  text-[10px] overflow-hidden overflow-ellipsis  whitespace-nowrap">
          {props.harga === 0 ? "Free" : `${formatPrice(props.harga)}`}
        </h1>
        {/* BUTTON REVIEW */}
        <Button
          className="mt-[10px] w-full p-0 text-[12px]"
          onClick={handleShowConfirmationModal}
        >
          Payment Confirmation
        </Button>
      </div>
      {/* Modal Konfirmasi */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 mx-[10px] flex w-fit items-center justify-center  md:w-full">
          <div className="rounded-lg bg-white p-8 shadow-xl">
            <p className=" text-center">
              Are you sure you have made the payment?
            </p>
            <div className="mt-4  space-x-4">
              <Input
                placeholder="0"
                type="file"
                onChange={(e: any) => {
                  setFileName(e.target.files[0]);
                }}
              />
              <div className=" mt-4 flex justify-end space-x-4">
                <Button onClick={onHandleCheckout}>Ya</Button>
                <Button onClick={handleCloseConfirmationModal}>Batal</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default CardCheckout;
