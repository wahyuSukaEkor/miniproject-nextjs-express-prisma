"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  totalPages: number;
  canNextPage: boolean;
  canPrevPage: boolean;
}

export function TransactionDataTable<TData, TValue>({
  columns,
  data,
  page,
  totalPages,
  canNextPage,
  canPrevPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/* filter */}
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search Event..."
            value={
              (table.getColumn("event_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("event_name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[250px] lg:w-[300px]"
          />
        </div>

        {/* show and hide column */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide(),
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center gap-2">
        {totalPages > 1 && (
          <>
            <Button size="sm" disabled={!canPrevPage}>
              <Link
                href="/dashboard/transactions?page=1"
                scroll={false}
                className="flex gap-[2px]"
              >
                <ChevronsLeft className="h-5 w-5" />
                First
              </Link>
            </Button>
            <Button size="sm" disabled={!canPrevPage}>
              <Link
                href={`/dashboard/transactions?page=${page - 1}`}
                scroll={false}
                className="flex gap-[2px]"
              >
                <ChevronLeft className="h-5 w-5" />
                Prev
              </Link>
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button size="sm" disabled={!canNextPage}>
              <Link
                href={`/dashboard/transactions?page=${page + 1}`}
                scroll={false}
                className="flex gap-[2px]"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="sm" disabled={!canNextPage}>
              <Link
                href={`/dashboard/transactions?page=${totalPages}`}
                scroll={false}
                className="flex gap-[2px]"
              >
                Last
                <ChevronsRight className="h-5 w-5" />
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
