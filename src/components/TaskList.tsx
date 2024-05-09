import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../types";
import TaskItem from "./TaskItem";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { updateTasks } from "../store/slices/taskSlice";

interface Props {
  searchString: string;
}

const TaskList: React.FC<Props> = ({ searchString }) => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchString.toLowerCase())
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 15,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  // метод для обработки окончания перетаскивания задачи
  const handleDragEnd = (e: DragEndEvent) => {
    // active - элемент, который перетаскивают, over - элемент за который перетаскивают
    const { active, over } = e;
    // проверка, что есть > 1 элемента
    if (active.id !== over?.id) {
      // получаем индекс перетаскиваемого элемента
      const oldIndex = tasks.findIndex((item) => item.id === active.id);
      // получаем индекс элемента за который перетаскивают
      const newIndex = tasks.findIndex((item) => item.id === over?.id);

      const newTasks = [...tasks];
      // удаляем перетаскиваемый элемент из нового массива
      newTasks.splice(oldIndex, 1);
      // вставляем перетаскиваемый элемент
      newTasks.splice(newIndex, 0, tasks[oldIndex]);
      // обновляем стейт
      dispatch(updateTasks(newTasks));
    }
  };

  return (
    <div className="">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={tasks.map((task) => task.id)}>
          <ul className="flex flex-col gap-3">
            {filteredTasks.map((task: Task) => (
              <TaskItem key={task.id} {...task} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskList;
