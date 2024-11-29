"use client";
import * as React from "react";
import CardEvent from "../../_components/card-event";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { LocationResponse } from "@/types/location";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { LocationSearch } from "@/components/shared/location-search";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface IAllEventSectionProps {}

const AllEventSection: React.FunctionComponent<IAllEventSectionProps> = (
  props,
) => {
  const handleSetActive = React.useCallback((item: LocationResponse) => {
    setSelected(item);
    setOpen(false);
  }, []);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<
    LocationResponse | undefined
  >();
  const displayName = selected ? selected.name : "Select location";

  //fitur pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  //fitur lain
  const [activeButton, setActiveButton] = React.useState("All");
  const [events, setEvents] = React.useState([]);
  const [getData, setGetData] = React.useState<any>({
    categoryId: 0,
    location: "",
  });

  // FITUR DATE
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");

  //fitur search
  const [search, setSearch] = React.useState("");
  const [searchDebouce] = useDebounce(search, 1000);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    onHandleGet();
  }, [getData, currentPage, searchDebouce, startDate, endDate]);
  const onHandleGet = async () => {
    try {
      setLoading(true);
      let params: string[] = [];
      if (searchDebouce) {
        params.push(`name=${searchDebouce}`);
      }

      if (getData.categoryId) {
        params.push(`categoryId=${getData.categoryId}`);
      }

      if (getData.location) {
        params.push(`locationId=${getData.location.id}`);
      }

      if (currentPage) {
        params.push(`page=${currentPage}`);
      }

      if (startDate) {
        const isoStartDate = new Date(startDate).toISOString();
        params.push(`startDate=${isoStartDate}`);
      }

      if (endDate) {
        const isoEndDate = new Date(endDate).toISOString();
        params.push(`endDate=${isoEndDate}`);
      }

      const queryString = params.length ? `?${params.join("&")}` : "";
      const url = `${NEXT_PUBLIC_BASE_API_URL}/events${queryString}`;
      const response = await axios.get(url);

      setEvents(response.data.result);
      setTotalPages(Math.ceil(response.data.total / response.data.limit));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    setGetData({ ...getData, page });
  };

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <Button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`h-[30px] w-auto border bg-white px-4 ${
          currentPage === i ? "border-blue-500" : "border-gray-400"
        } rounded-md text-black hover:bg-[#53b253] hover:text-white`}
      >
        {i}
      </Button>,
    );
  }

  console.log("search By Name :", searchDebouce);

  return (
    <section className="">
      <div className=" mx-[10px] my-[26px] md:mx-[140px] ">
        <div className=" flex   justify-between  overflow-hidden overflow-x-auto ">
          <div>
            <h1 className=" text-[14px] font-semibold md:text-[24px]">
              All Event
            </h1>
            <div className="mt-[10px] flex  space-x-4 overflow-hidden overflow-x-auto ">
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "All" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 0,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("All");
                }}
              >
                All
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Festival" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 1,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Festival");
                }}
              >
                Festival
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Concert" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 2,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Concert");
                }}
              >
                Concert
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Sport" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 3,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Sport");
                }}
              >
                Sport
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Workshop & Seminar" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 4,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Workshop & Seminar");
                }}
              >
                Workshop & Seminar
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Theater & Drama" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 5,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Theater & Drama");
                }}
              >
                Theater & Drama
              </Button>
              <Button
                className={`h-[30px] w-auto border bg-white px-4 ${activeButton === "Attractions" ? "border-blue-500" : "border-gray-400"} rounded-md text-black hover:bg-[#53b253] hover:text-white`}
                type="button"
                onClick={(element: any) => {
                  const newData = {
                    ...getData,
                    categoryId: 6,
                  };
                  setCurrentPage(1);
                  setGetData(newData);
                  setActiveButton("Attractions");
                }}
              >
                Attractions
              </Button>
            </div>
            <div className="mt-6 flex space-x-4">
              {/* SELECT NAME AWAL */}
              <Input
                className="h-[36px] w-[300px]  bg-[#f4f7fe]"
                type="text"
                placeholder="Search for your event"
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* SELECT NAME AKHIR  */}
              {/* SELECT LOCATION MULAI */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      " w-fit",
                      !selected && "text-muted-foreground",
                    )}
                  >
                    {displayName}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <LocationSearch
                    selectedResult={selected}
                    onSelectResult={(result) => {
                      setGetData({ ...getData, location: result });
                      handleSetActive(result);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {/* SELECT LOCATION AKHIR */}

              {/* SELECT DATE AWAL  */}
              <div className=" flex items-center space-x-4 ">
                <h1>Start Date :</h1>
                <input
                  type="date"
                  className=" rounded-md border px-4 py-1"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div className=" flex items-center space-x-4 ">
                <h1>End Date :</h1>
                <input
                  type="date"
                  className=" rounded-md border px-4 py-1"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
              {/* SELECT DATE AKHIR  */}
            </div>
          </div>
        </div>
        <div className=" mx-auto my-[18px] grid grid-cols-2 gap-4  md:grid md:grid-cols-5">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="col-span-1">
                <Skeleton height={250} />
                <Skeleton count={3} />
              </div>
            ))
          ) : events.length === 0 ? (
            <div className="col-span-2 flex h-[500px] items-center justify-center rounded-md bg-gray-200 italic md:col-span-5">
              Event not found 🙇‍♀️🙇‍♀️
            </div>
          ) : (
            events.map((event: any, index: number) => (
              <div key={index}>
                <CardEvent
                  id={event.id}
                  urlImage={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                  judul={event.name}
                  lokasi={event.location.name}
                  waktu={event.createdAt}
                  harga={event.price}
                />
              </div>
            ))
          )}
        </div>
        <div className=" space-x-4 ">
          {events.length > 0 && paginationButtons}
        </div>
      </div>
    </section>
  );
};

export default AllEventSection;
