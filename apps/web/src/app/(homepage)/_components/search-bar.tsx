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

interface IInputSearchProps {}

const InputSearch: React.FunctionComponent<IInputSearchProps> = (props) => {
  const handleSetActive = React.useCallback((item: LocationResponse) => {
    setSelected(item);
    setOpen(false);
  }, []);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<LocationResponse | undefined>();
  const displayName = selected ? selected.name : "Select location";

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
        url += `${getData.category || getData.location ? "&" : ""}event_name=${searchDebouce}`;
      }
      if (getData.category) {
        url += `${searchDebouce || getData.location ? "&" : ""}category_id=${getData.category}`;
      }
      if (getData.location) {
        url += `${searchDebouce || getData.category ? "&" : ""}location_id=${getData.location.id}`;
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
    <section className="mx-auto flex">
      <Sheet>
        <SheetTrigger>
          <Input
            className="mx-auto mt-[12px] h-[40px] w-[320px] bg-[#f4f7fe] text-sm font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search for your event"
          />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="mx-auto mb-0 h-[500px] w-full overflow-hidden rounded-lg bg-white md:mb-10 md:h-[580px] md:w-[480px]"
        >
          <SheetHeader>
            <SheetDescription className="mx-auto">
              <Input
                className="h-[40px] w-[320px] bg-[#f4f7fe] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search for your event"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="mt-[12px] flex space-x-6">
                <Select
                  onValueChange={(element: any) => {
                    const newData = {
                      ...getData,
                      category: element === "all" ? "" : element,
                    };
                    setGetData(newData);
                  }}
                >
                  <SelectTrigger className="w-[160px] h-[36px] bg-[#f4f7fe] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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

                {/* LOCATION SELECTOR */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-[216px] h-[36px] overflow-hidden overflow-ellipsis whitespace-nowrap bg-[#f4f7fe] rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500",
                        !selected && "text-muted-foreground"
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
                {/* END LOCATION SELECTOR */}
              </div>
              <div className="flex overflow-auto rounded-b-lg p-4">
                <div className="mt-[14px] h-[320px] space-y-1">
                  {event.length === 0 ? (
                    <div className="text-center text-sm text-gray-500">Event not found</div>
                  ) : (
                    event.map((event: any, index: number) => (
                      <div key={index}>
                        <CardSearch
                          id={event.id}
                          judul={event.event_name}
                          lokasi={event.location?.name}
                          imageURL={NEXT_PUBLIC_BASE_API_URL + event.thumbnails_path}
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
