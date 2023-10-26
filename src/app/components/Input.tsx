import { IErrors, IInputProps } from "../types/interfaces";

const Input: React.FC<IInputProps> = ({
  target,
  type,
  value,
  errors,
  handleChange,
  rowIndex,
  labelIsNeeded,
}) => (
  <div>
    {labelIsNeeded && (
      <label
        htmlFor={target}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {target}
      </label>
    )}

    <div className="mt-2">
      <input
        id={target}
        name={target}
        type={type}
        autoComplete={target}
        required
        value={value}
        className="block min-w-max w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => handleChange(target, e.target.value, rowIndex)}
      />

      {errors[target as keyof IErrors] && (
        <span
          className="hasError block w-fit mt-1 p-1 text-red-700 border-2 border-red-700 rounded-md"
          style={{ animation: "pulsate 5s infinite" }}
        >
          {errors[target as keyof IErrors]}
        </span>
      )}
    </div>
  </div>
);

export default Input;
