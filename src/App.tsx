import { useState } from "react";
import { useSelector } from "react-redux";
import AddTaskForm from "./components/AddTaskForm";
import "./App.css";
import SearchBar from "./components/SearchBar";
import TaskList from "./components/TaskList";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const [searchString, setSearchString] = useState("");

  const handleSearch = (value: string) => {
    setSearchString(value);
  };

  return (
    <main className="p-4 flex flex-col items-center gap-4 overflow-hidden">
      <h1 className="text-2xl font-bold">Список задач</h1>
      <div className="flex flex-col gap-4 w-[350px] md:w-[600px] lg:w-[800px]">
        <div className="flex gap-4 w-full">
          <div className="p-2 bg-green-300 rounded-lg border border-gray-300 shadow-md flex-1">
            <p className="text-md text-gray-700">
              Выполнено: {tasks.filter((task) => task.completed === true).length}
            </p>
          </div>
          <div className="p-2 bg-orange-300 rounded-lg border border-gray-300 shadow-md flex-1">
            <p className="text-md text-gray-700">
              Не выполнено: {tasks.filter((task) => task.completed === false).length}
            </p>
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />

        <AddTaskForm />
        <TaskList searchString={searchString} />
      </div>
    </main>
  );
};

export default App;
