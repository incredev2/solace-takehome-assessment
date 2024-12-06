"use client";

import { useMemo } from "react";
import { useAdvocates } from "../hooks/useAdvocates";
import { Table } from "../components/Table";
import { Pagination } from "../components/Pagination";
import { Advocate } from "../hooks/useAdvocates";

export default function Home() {
  const {
    advocates,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    onPageChange,
  } = useAdvocates();

  const columns = useMemo(() => [
    { header: "First Name", accessor: "firstName", width: "150px" },
    { header: "Last Name", accessor: "lastName", width: "150px" },
    { header: "City", accessor: "city", width: "150px" },
    { header: "Degree", accessor: "degree", width: "150px" },
    {
      header: "Specialties",
      accessor: (advocate: Advocate) => (
        <div className="space-y-1 flex flex-wrap gap-1">
          {advocate.specialties.map((specialty, index) => (
            <span
              key={`${advocate.id}-${index}`}
              className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      ),
      width: "300px",
    },
    {
      header: "Years of Experience",
      accessor: "yearsOfExperience",
      width: "150px",
    },
    { header: "Phone Number", accessor: "phoneNumber", width: "150px" },
  ], []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const element = document.getElementById("search-term");
    if (element) {
      element.innerHTML = newSearchTerm;
    }
  };

  const onClick = () => {
    setSearchTerm("");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Solace Advocates
      </h1>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Advocates
        </label>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              onChange={onChange}
              value={searchTerm}
              placeholder="Search by name, city, degree, or specialties..."
            />
          </div>
          <button
            onClick={onClick}
            className="px-4 py-2.5 bg-white text-gray-700 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium transition-colors"
          >
            Reset
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Searching for:{" "}
          <span id="search-term" className="font-medium text-gray-900"></span>
        </p>
      </div>

      <div className="space-y-4">
        <Table columns={columns} data={advocates} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </main>
  );
}
