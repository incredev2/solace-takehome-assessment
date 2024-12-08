import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

interface AdvocatesResponse {
  data: Advocate[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function useAdvocates() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchAdvocates = async (search: string = "", page: number = 1) => {
    setIsLoading(true);
    try {
      console.log("fetching advocates...");
      const response = await fetch(
        `/api/advocates?search=${encodeURIComponent(search)}&page=${page}`
      );
      const data: AdvocatesResponse = await response.json();
      setAdvocates(data.data);
      setTotalPages(data.metadata.totalPages);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvocates(debouncedSearchTerm, currentPage);
  }, [debouncedSearchTerm, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    advocates,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
    isLoading,
  };
}

export type { Advocate, AdvocatesResponse };
