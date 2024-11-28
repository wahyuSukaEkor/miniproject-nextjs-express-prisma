"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDebounce } from "use-debounce";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardSearch from "./card-search";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { LocationSearch } from "@/components/shared/location-search";
import { LocationResponse } from "@/types/location";
import { ChevronsUpDown } from "lucide-react";
// import SelectLocation from "./profile/select-location";

interface IInputSearchProps {}

const InputSearch: React.FunctionComponent<IInputSearchProps> = (props) => {
  //buat location
  const handleSetActive = React.useCallback((item: LocationResponse) => {
    setSelected(item);
    setOpen(false);
  }, []);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<
    LocationResponse | undefined
  >();
  const displayName = selected ? selected.name : "Select location";
  //buat kategori
  const [categories, setCategories] = React.useState<any[]>([]);

  const [getData, setGetData] = React.useState<any>({
    category: "",
    location: "",
  });
  const [search, setSearch] = React.useState("");
  const [event, setEvent] = React.useState<any>([]);
  const [searchDebouce] = useDebounce(search, 1000);
  React.useEffect(() => {
    onHandleGet();
    getCategories();
  }, [searchDebouce, getData, open]);
  const onHandleGet = async () => {
    try {
      let url = NEXT_PUBLIC_BASE_API_URL + "/events/search?";
      if (searchDebouce) {
        url += `${getData.category || getData.location ? "&" : ""}name=${searchDebouce}`;
      }
      if (getData.category) {
        url += `${searchDebouce || getData.location ? "&" : ""}categoryId=${getData.category}`;
      }
      if (getData.location) {
        url += `${searchDebouce || getData.category ? "&" : ""}locationId=${getData.location.id}`;
      }

      let response = await axios.get(url);
      setEvent(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategories = async () => {
    try {
      const url = NEXT_PUBLIC_BASE_API_URL + "/categories";
      const response = await axios.get(url);
      setCategories(response.data.result);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };
  return (
    <section className=" mx-auto flex">
      <Sheet>
        <SheetTrigger>
          <Input
            className="mx-auto mt-[10px] h-[36px] w-[300px]"
            type="text"
            placeholder="Search for your event"
          />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="mx-auto mb-0 h-[450px] w-full overflow-hidden rounded-lg bg-white md:mb-10 md:h-[534px] md:w-[450px]"
        >
          <SheetHeader>
            <SheetDescription className="  mx-auto">
              <Input
                className="h-[36px] w-[300px]  bg-[#f4f7fe]"
                type="text"
                placeholder="Search for your event"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className=" mt-[10px] flex space-x-8">
                <Select
                  onValueChange={(element: any) => {
                    const newData = {
                      ...getData,
                      category: element === "all" ? "" : element,
                    };
                    setGetData(newData);
                  }}
                >
                  <SelectTrigger className="w-[158px] ">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="all" value="all">
                      All Category
                    </SelectItem>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* SELECT LOCATION MULAI */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-[216px] overflow-hidden overflow-ellipsis whitespace-nowrap",
                        !selected && "text-muted-foreground",
                      )}
                    >
                      {displayName}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 ">
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
              </div>
              <div className="flex overflow-auto rounded-b-lg p-4">
                <div className="mt-[12px] h-[320px] space-y-1">
                  {event.length === 0 ? (
                    <div className="text-center">Event not found</div>
                  ) : (
                    event.map((event: any, index: number) => (
                      <div key={index}>
                        <CardSearch
                          id={event.id}
                          judul={event.name}
                          lokasi={event.location?.name}
                          imageURL={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default InputSearch;
