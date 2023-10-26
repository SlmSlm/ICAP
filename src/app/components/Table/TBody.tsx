import { patchTable } from "@/app/api/api";
import { IData, IDataItem, IErrors, ITableItems } from "@/app/types/interfaces";
import { convertDateFormat } from "@/app/utils/convertDateFormat";
import { validateInput } from "@/app/utils/inputValidator";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditIcon from "../../../public/img/edit.svg";
import Input from "../Input";

interface IProps {
  data: IData | undefined;
  tableItems: ITableItems;
}

const TBody = (props: IProps) => {
  const { data, tableItems } = props;

  const [editedCell, setEditedCell] = useState<{
    row: number | null;
    col: string | null;
  }>({
    row: null,
    col: null,
  });
  const [errors, setErrors] = useState<IErrors>({
    name: "",
    email: "",
    birthday_date: "",
    phone_number: "",
    address: "",
  });
  const [editedData, setEditedData] = useState<IData | undefined>(data);

  const handleEdit = (rowIndex: number, cellKey: string) => {
    setEditedCell({ row: rowIndex, col: cellKey });
  };

  const handleChange = (
    fieldName: string,
    value: string,
    rowIndex?: number
  ) => {
    setEditedData((prevData) => {
      if (prevData) {
        const updatedResults = prevData.results.map((item, itemIndex) => {
          if (itemIndex === rowIndex) {
            return {
              ...item,
              [fieldName]: value,
            };
          }
          return item;
        });

        return { ...prevData, results: updatedResults };
      }
      return prevData;
    });

    setErrors({ ...errors, [fieldName]: validateInput(fieldName, value) });
  };

  const handleSave = (id: number) => {
    setEditedCell({ row: null, col: null });

    const elementToUpdate = editedData?.results.find(
      (element) => element.id === id
    );

    if (elementToUpdate) {
      elementToUpdate.birthday_date = convertDateFormat(
        elementToUpdate?.birthday_date
      );
      patchTable(`/api/table/${id}/`, elementToUpdate);
    }
  };

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  return (
    <>
      {editedData?.results.map((item, rowIndex) => {
        return (
          <tbody className="bg-white divide-y divide-gray-200" key={rowIndex}>
            <tr>
              {Object.keys(tableItems).map((key) => (
                <td
                  key={key}
                  className="px-6 py-4 whitespace-no-wrap text-gray-500"
                >
                  <div className="flex justify-between">
                    {editedCell.row === rowIndex && editedCell.col === key ? (
                      <>
                        <Input
                          target={key}
                          type="text"
                          value={item[key as keyof IDataItem]}
                          errors={errors}
                          handleChange={handleChange}
                          rowIndex={rowIndex}
                          labelIsNeeded={false}
                        />
                        <button
                          onClick={() => handleSave(item.id)}
                          className="text-indigo-600"
                          disabled={!!errors[key]}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="max-w-[80%] break-words">
                          {item[key as keyof IDataItem]}
                        </span>
                        <Image
                          src={EditIcon}
                          alt="edit"
                          width={14}
                          height={14}
                          className="hover:cursor-pointer"
                          onClick={() => handleEdit(rowIndex, key)}
                        />
                      </>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        );
      })}
    </>
  );
};

export default TBody;
