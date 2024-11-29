import * as React from "react";
import { FaCoins } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch";

interface IRedeemPointSectionProps {}

const RedeemPointSection: React.FunctionComponent<IRedeemPointSectionProps> = (
  props,
) => {
  return (
    <div className="mx-[10px] md:mx-0">
      <div className="ml-0 mt-[20px] w-full rounded-lg bg-white p-3 shadow md:ml-[120px] md:h-auto md:w-[828px] md:p-0 md:px-[28px] md:py-[28px]">
        <div className=" flex justify-between">
          <div className=" flex items-center space-x-4">
            <FaCoins className="h-[20px] w-[20px] text-[#aeb2be] md:h-[24px] md:w-[24px]" />
            <p className=" text-[12px] text-gray-500">Redeem Point</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default RedeemPointSection;
