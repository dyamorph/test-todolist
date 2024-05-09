import { useState } from "react";
import { addTask } from "../store/slices/taskSlice";
import { useDispatch } from "react-redux";
import { ChangeEvent } from "react";
import TextInput from "./TextInput";
import { FaPlus } from "react-icons/fa";
import Button from "./Button";

const AddTaskForm: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const trimmedTitle = taskTitle.trim();

    if (trimmedTitle !== "" && !/^\s*$/.test(trimmedTitle)) {
      dispatch(addTask({ title: taskTitle }));
      setTaskTitle("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value);

  return (
    <div className="relative">
      <FaPlus className="absolute text-gray-400 top-[50%] translate-y-[-50%] left-[6px] " />
      <form className="flex gap-4" action="#">
        <TextInput
          className="pl-[25px] flex-1"
          name="addTask"
          value={taskTitle}
          onChange={handleInputChange}
          placeholder="Покормить кота"
        />
        <Button onClick={handleSubmit} text="Добавить задачу" />
      </form>
    </div>
  );
};

export default AddTaskForm;
