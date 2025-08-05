import "./App.css";
import NavBar from "./state-management/NavBar";
import TaskList from "./state-management/tasks/TaskList";
import AuthProvider from "./state-management/auth/AuthProvider";
import { TasksProvider } from "./state-management/tasks";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <NavBar />
        <TaskList />
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
