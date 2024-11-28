"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { format, subDays } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { DateRange } from "react-day-picker";

const TransactionDateRangePicker: React.FC = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQuery = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (!date?.from && !date?.to) {
      params.delete("transaction_from");
      params.delete("transaction_to");
      return params.toString();
    }

    if (date?.from) {
      params.set("transaction_from", new Date(date.from).toISOString());
    }

    if (date?.to) {
      params.set("transaction_to", new Date(date.to).toISOString());
    }
    return params.toString();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button id="date" variant="outline">
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          disabled={(date) => date > new Date()}
        />
        <div className="flex justify-end px-4 py-2">
          <PopoverClose asChild>
            <Button
              type="button"
              onClick={() => {
                console.log(date?.from, date?.to);

                createQuery
                  ? router.push(`${pathname}?${createQuery()}`)
                  : router.push(pathname);
              }}
              className="w-full"
            >
              Submit
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TransactionDateRangePicker;
