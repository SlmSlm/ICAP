import { IForm } from "./Login";

interface InputProps {
  target: string;
  type: string;
  value: string;
  errors: IForm;
  handleChange: (fieldName: string, value: string) => void;
}

const Input: React.FC<InputProps> = ({
  target,
  type,
  value,
  errors,
  handleChange,
}) => (
  <div>
    <label
      htmlFor={target}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {target}
    </label>
    <div className="mt-2">
      <input
        id={target}
        name={target}
        type={type}
        autoComplete={target}
        required
        value={value}
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => handleChange(target, e.target.value)}
      />

      {errors[target as keyof IForm] && (
        <span
          className="hasError block w-fit mt-1 p-1 text-red-700 border-2 border-red-700 rounded-md"
          style={{ animation: "pulsate 5s infinite" }}
        >
          {errors[target as keyof IForm]}
        </span>
      )}
    </div>
  </div>
);

export default Input;
