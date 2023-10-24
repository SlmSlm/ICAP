"use client";

import { useEffect, useState } from "react";
import { getTable } from "../api/api";

interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IDataItem[];
}

interface IDataItem {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

const Table = () => {
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
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Birthday
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Phone number
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
          </tr>
        </thead>
        {data?.results.map((i, index) => {
          return (
            <tbody className="bg-white divide-y divide-gray-200" key={index}>
              <tr>
                <td className="px-6 py-4 whitespace-no-wrap text-gray-500">
                  {i.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-gray-500">
                  {i.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-gray-500">
                  {i.birthday_date}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-gray-500">
                  {i.phone_number}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-gray-500">
                  {i.address}
                </td>
              </tr>
            </tbody>
          );
        })}
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
    </div>
  );
};

export default Table;
