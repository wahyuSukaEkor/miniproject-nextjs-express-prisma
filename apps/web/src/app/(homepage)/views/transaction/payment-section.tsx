import * as React from "react";
import { FaTicketAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface IPaymentSectionProps {}

const PaymentSection: React.FunctionComponent<IPaymentSectionProps> = (
  props,
) => {
  return (
    <section className=" mx-[10px] md:mx-0">
      <div className="ml-0 mt-[20px] h-auto w-full rounded-lg bg-white shadow md:ml-[120px] md:h-auto md:w-[828px] md:px-[28px] md:py-[28px]">
        <div className=" flex justify-between">
          <Select>
            <SelectTrigger className="w-full md:w-[1000px]">
              <div className=" flex space-x-4">
                <FaTicketAlt className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
                <p className="text-[12px] text-gray-500">Payment method</p>
              </div>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1persen">
                  <div className="flex items-center ">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
                      alt="OVO Logo"
                      className="mr-6 h-4 object-contain"
                    />
                    <span>Mandiri</span>
                  </div>
                </SelectItem>
                <SelectItem value="2persen">
                  <div className="flex items-center ">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1280px-Logo_dana_blue.svg.png"
                      alt="OVO Logo"
                      className="mr-6 h-4 object-contain"
                    />
                    <span>DANA</span>
                  </div>
                </SelectItem>
                <SelectItem value="3persen">
                  <div className="flex items-center ">
                    <img
                      src="https://bewara.co.id/wp-content/uploads/2023/05/link-aja-e1684593519358.png"
                      alt="OVO Logo"
                      className="mr-6 h-4 object-contain"
                    />
                    <span>Link Aja</span>
                  </div>
                </SelectItem>
                <SelectItem value="4persen">
                  <div className="flex items-center ">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.png"
                      alt="OVO Logo"
                      className="mr-6 h-4 object-contain"
                    />
                    <span>Indomaret</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
