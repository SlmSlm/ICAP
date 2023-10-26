export interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IDataItem[];
}

export interface IDataItem {
  id: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

export interface ITableItems {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

export interface IInputProps {
  target: string;
  type: string;
  value: string | number;
  errors: IErrors;
  handleChange: (fieldName: string, value: string, rowIndex?: number) => void;
  rowIndex?: number;
  labelIsNeeded: boolean;
}

export interface IErrors {
  [key: string]: string;
}
