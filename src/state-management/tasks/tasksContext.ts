import { Dispatch } from "react";
import { Task, TaskAction } from "./TasksProvider";
import React from "react";

interface tasksContextType {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
}

const TasksContext = React.createContext<tasksContextType>(
  {} as tasksContextType
);

export default TasksContext;
