import { ChangeEvent } from "react";

interface Props {
  name: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
}

const TextInput: React.FC<Props> = ({ name, className, onChange, value, placeholder }) => {
  return (
    <input
      type="text"
      name={name}
      className={`${className} rounded-lg border-gray-400 border-[2px] py-2 px-3 focus:outline-none focus:ring-0 focus:border-violet-600 border-solid text-md shadow-md`}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
