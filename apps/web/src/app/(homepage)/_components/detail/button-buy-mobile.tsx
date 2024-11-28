import * as React from "react";
import { Button } from "@/components/ui/button";

interface IButtonBeliMobileProps {}

const ButtonBeliMobile: React.FunctionComponent<IButtonBeliMobileProps> = (
  props
) => {
  return (
    <div>
      <Button
        className="block md:hidden w-full h-[40px]  bg-[#53B253]  text-white rounded-md"
        type="button"
      >
        Beli Tiket
      </Button>
    </div>
  );
};

export default ButtonBeliMobile;