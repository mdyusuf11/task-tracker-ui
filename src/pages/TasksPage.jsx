import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTasks(await api.listTasks());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <>
      <TaskForm onCreated={refresh} />
      {error && <p className="error">API error: {error}. Is the BackEnd running on port 8080?</p>}
      <TaskList tasks={tasks} loading={loading} onChange={refresh} />
    </>
  );
}
