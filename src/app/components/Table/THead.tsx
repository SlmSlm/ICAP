import React from "react";
import { ITableItems } from "@/app/types/interfaces";

interface IProps {
  tableItems: ITableItems;
}

const THead: React.FC<IProps> = ({ tableItems }) => {
  return (
    <thead>
      <tr>
        {Object.keys(tableItems).map((key) => (
          <th
            key={key}
            className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            {tableItems[key as keyof typeof tableItems]}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default THead;
