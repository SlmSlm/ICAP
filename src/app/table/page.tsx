"use client";

import { useEffect, useState } from "react";
import { getTable } from "../api/api";
import TBody from "../components/Table/TBody";
import THead from "../components/Table/THead";
import { IData, ITableItems } from "../types/interfaces";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = () => {
  const tableItems: ITableItems = {
    name: "name",
    email: "email",
    birthday_date: "birthday date",
    phone_number: "phone number",
    address: "address",
  };
  const [data, setData] = useState<IData>();
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData(endpoint?: string | null) {
    try {
      const result = await getTable(endpoint || "/api/table/");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <THead tableItems={tableItems} />
        <TBody data={data} tableItems={tableItems} />
      </table>

      <div className="flex justify-center mt-4">
        {data?.previous && (
          <button
            onClick={() => {
              fetchData(data.previous);
              setCurrentPage(currentPage - 1);
            }}
            className="px-4 py-2 rounded-md border text-black text-sm mr-2 bg-gray-50 text-gray-500"
          >
            Prev
          </button>
        )}

        <button
          className="px-4 py-2 rounded-md border text-black text-sm bg-gray-50 text-gray-500"
          disabled
        >
          {currentPage}
        </button>

        {data?.next && (
          <button
            onClick={() => {
              fetchData(data.next);
              setCurrentPage(currentPage + 1);
            }}
            className="px-4 py-2 rounded-md border text-black text-sm ml-2 bg-gray-50 text-gray-500"
          >
            Next
          </button>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} />

    </div>
  );
};

export default Table;
