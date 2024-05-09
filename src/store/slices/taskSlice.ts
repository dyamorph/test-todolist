import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../types";

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ title: string }>) {
      state.push({
        id: uuidv4(),
        title: action.payload.title,
        completed: false,
      });
    },

    removeTask(state, action: PayloadAction<{ id: string }>) {
      return state.filter((task) => task.id !== action.payload.id);
    },

    toggleTask(state, action: PayloadAction<{ id: string }>) {
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, completed: !task.completed } : task
      );
    },

    updateTasks: (_state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
  },
});

export const { addTask, removeTask, toggleTask, updateTasks } = taskSlice.actions;
export default taskSlice.reducer;
