"use client";
import { CircleUser } from "lucide-react";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserProfile } from "@/data/user";
import Cookies from "js-cookie";
import { formatPrice } from "@/lib/formatter";
import { Button } from "@/components/ui/button";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [voucher, setVoucher] = React.useState<any[]>([]);
  const [point, setPoint] = React.useState<number>(0);
  const [referalCode, setReferalCode] = React.useState<number>(0);
  const [dataUser, setDataUser] = React.useState<any>({
    username: "",
    email: "",
  });

  React.useEffect(() => {
    getApiDetail();
  }, []);

  const getApiDetail = async () => {
    try {
      const UserProfile = await getUserProfile(Cookies.get("user-tkn")!);
      let voucherAfterFilter = [];
      for (let i = 0; i < UserProfile.result.vouchers.length; i++) {
        if (
          UserProfile.result.vouchers[i].usage <
          UserProfile.result.vouchers[i].maxUsage
        ) {
          voucherAfterFilter.push(UserProfile.result.vouchers[i]);
        }
      }

      const userPoint = UserProfile.result.point?.balance || 0
      setPoint(userPoint);
      setVoucher(UserProfile.result.vouchers);
      setReferalCode(UserProfile.result.referralCode);
      setDataUser(UserProfile.result);
      console.log("TESTING", UserProfile.result);
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };
  return (
    <section className=" mx-auto w-full rounded-lg bg-white p-10 ">
      <div>
        <div className=" space-y-5">
          <CircleUser className="mx-auto h-24 w-24" />
          <h1 className=" text-center">{dataUser.username}</h1>
          <h1 className=" text-center">{dataUser.email}</h1>
          <div className=" flex items-center justify-between rounded-lg border p-4">
            <h1>Referal Code</h1>
            <h1>{referalCode}</h1>
          </div>
          <div className=" flex items-center justify-between ">
            <Select>
              <SelectTrigger className="w-full p-4">
                <SelectValue placeholder="My Voucher" />
              </SelectTrigger>
              <SelectContent>
                {voucher.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    You have no vouchers available.
                  </div>
                ) : (
                  voucher.map((voucher: any, index: number) => (
                    <SelectItem key={index} value={voucher.id}>
                      {voucher.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className=" flex items-center justify-between rounded-lg border p-4">
            <h1>My Point</h1>
            <h1>{point === null ? formatPrice(0) : formatPrice(point)}</h1>
          </div>
          <div className=" flex items-center justify-between rounded-lg border p-4">
            <h1>Password</h1>
            <h1>**************</h1>
          </div>
          <div className=" text-right">
            <Button className=" w-full  md:w-56">Change Password</Button>
          </div>
        </div>

        {/* INI ADALAH BAGIAN VOUCHER AKHIR */}
      </div>
    </section>
  );
};

export default App;
