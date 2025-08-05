import "./App.css";
import NavBar from "./state-management/NavBar";
import TaskList from "./state-management/TaskList";
import AuthProvider from "./state-management/reducers/AuthProvider";
import TasksProvider from "./state-management/reducers/TasksProvider";

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
