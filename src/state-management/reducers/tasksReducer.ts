interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD"; //
  task: Task; // task object to be added, an additonal payload
}

interface Deletetask {
  type: "DELETE";
  taskId: number; //task id of the task to delete.
}

type TaskAction = AddTask | Deletetask;

const tasksReducer = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD":
      return [action.task, ...tasks];

    case "DELETE":
      return tasks.filter((t) => t.id != action.taskId);
  }
};

export default tasksReducer;
