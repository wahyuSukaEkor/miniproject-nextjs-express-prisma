import { useState } from "react";

const usePagination = () => {
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPrevPage, setCanPrevPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  return {
    canNextPage,
    setCanNextPage,
    canPrevPage,
    setCanPrevPage,
    totalPages,
    setTotalPages,
  };
};

export default usePagination;
