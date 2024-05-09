import { useDispatch } from "react-redux";
import { removeTask, toggleTask } from "../store/slices/taskSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  id: string;
  title: string;
  completed: boolean;
}

const TaskItem: React.FC<Props> = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (id: string) => {
    dispatch(removeTask({ id }));
  };

  const handleToggle = (id: string) => {
    dispatch(toggleTask({ id }));
  };

  return (
    <li
      className={`flex gap-5 border px-3 py-3 rounded-lg hover:border-gray-400 transition-colors delay-[50ms] text-[18px] shadow-sm ${
        completed ? "bg-green-50" : "bg-slate-50"
      }`}
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <input type="checkbox" name="complete" onClick={() => handleToggle(id)} className="z-10" />

      {completed ? (
        <p className="line-through flex-1">{title}</p>
      ) : (
        <p className="flex-1">{title}</p>
      )}

      <button onClick={() => handleDelete(id)} className="p-[2px] hover:text-red-700">
        <MdDeleteOutline className=" transition-colors delay-100 w-[18px] h-[18px]" />
      </button>
    </li>
  );
};

export default TaskItem;
