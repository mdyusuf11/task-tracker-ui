import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getStats()
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load stats"));
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!stats) {
    return <div className="card">Loading stats…</div>;
  }

  return (
    <div className="card">
      <h2>Stats</h2>
      <p className="muted">Fed by the same API that will stream events to BigQuery in later modules.</p>
      <div className="stats-grid">
        <div className="stat">
          <strong>{stats.total}</strong>
          Total tasks
        </div>
        <div className="stat">
          <strong>{stats.open}</strong>
          Open
        </div>
        <div className="stat">
          <strong>{stats.completed}</strong>
          Completed
        </div>
        <div className="stat">
          <strong>{stats.completion_rate}%</strong>
          Completion rate
        </div>
      </div>
    </div>
  );
}
