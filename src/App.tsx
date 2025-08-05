import "./App.css";
import NavBar from "./state-management/NavBar";
import TaskList from "./state-management/tasks/TaskList";
import { TasksProvider } from "./state-management/tasks";
import Counter from "./state-management/counter/Counter";

function App() {
  return (
      <TasksProvider>
        <Counter />
        <NavBar />
        <TaskList />
      </TasksProvider>
  );
}

export default App;
