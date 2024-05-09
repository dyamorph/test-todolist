import { ChangeEvent, useState } from "react";
import TextInput from "./TextInput";
import { FaSearch } from "react-icons/fa";

interface Props {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchString, setSearchString] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchString(value);
    onSearch(value);
  };

  return (
    <div className="relative flex items-center">
      <FaSearch className="absolute left-[8px] text-gray-400 w-[13px] top-[50%] translate-y-[-50%]" />
      <TextInput
        name="search"
        onChange={handleChange}
        placeholder="Поиск по задачам"
        value={searchString}
        className="pl-[25px] text-md w-full"
      />
    </div>
  );
};

export default SearchBar;
