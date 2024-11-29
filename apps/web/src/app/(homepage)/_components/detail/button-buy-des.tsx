import * as React from "react";
import { Button } from "@/components/ui/button";

interface IButtonBeliDesProps {}

const ButtonBeliDes: React.FunctionComponent<IButtonBeliDesProps> = (props) => {

  const onHandleSeatReq = async () =>{
    
  }
  return (
    <div>
      <Button
        className="hidden md:block w-[136px] h-[36px]  bg-[#53B253]  text-white rounded-md"
        type="button"
      >
        Beli Tiket
      </Button>
    </div>
  );
};

export default ButtonBeliDes;