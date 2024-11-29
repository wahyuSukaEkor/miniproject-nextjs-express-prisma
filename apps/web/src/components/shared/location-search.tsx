import React from "react";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getLocations } from "@/data/location";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResponseWithData } from "@/types/global";
import { LocationResponse } from "@/types/location";

type SearchProps = {
  selectedResult?: LocationResponse;
  onSelectResult: (item: LocationResponse) => void;
};

export function LocationSearch({
  selectedResult,
  onSelectResult,
}: SearchProps) {
  const [query, setQuery] = React.useState("");

  const handleSelectResult = (item: LocationResponse) => {
    onSelectResult(item);
  };

  return (
    <Command
      shouldFilter={false}
      className="h-auto rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search for item"
      />
      <SearchResults
        query={query}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  );
}

type SearchResultsProps = {
  query: string;
  selectedResult: SearchProps["selectedResult"];
  onSelectResult: SearchProps["onSelectResult"];
};

function SearchResults({
  onSelectResult,
  query,
  selectedResult,
}: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 300);

  const enabled = !!debouncedSearchQuery;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<ResponseWithData<LocationResponse[]>>({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => getLocations(debouncedSearchQuery),
    enabled,
  });

  const isLoading = enabled && isLoadingOrig;

  return (
    <CommandList>
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {!isError && !isLoading && !data?.result.length && (
        <div className="p-4 text-sm">No locations found</div>
      )}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}
      {data?.result.map(({ id, name }) => {
        return (
          <CommandItem
            key={id}
            onSelect={() => onSelectResult({ id, name })}
            value={name}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedResult?.id === id ? "opacity-100" : "opacity-0",
              )}
            />
            {name}
          </CommandItem>
        );
      })}
    </CommandList>
  );
}
