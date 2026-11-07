import { NavLink, Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>TaskTracker</h1>
        <nav>
          <NavLink to="/" end>
            Tasks
          </NavLink>
          <NavLink to="/stats">Stats</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </div>
  );
}
