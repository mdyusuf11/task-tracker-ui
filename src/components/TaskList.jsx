import { api } from "../api/client.js";

export default function TaskList({ tasks, loading, onChange }) {
  async function toggle(task) {
    await api.updateTask(task.id, { completed: !task.completed });
    onChange();
  }

  async function remove(id) {
    await api.deleteTask(id);
    onChange();
  }

  if (loading) {
    return <div className="card">Loading tasks…</div>;
  }

  if (tasks.length === 0) {
    return <div className="card muted">No tasks yet. Create one above.</div>;
  }

  return (
    <div className="card task-list">
      <h2>Your tasks</h2>
      <div className="task-table">
        <div className="task-table-header">
          <div className="task-col-item">Item</div>
          <div className="task-col-body">Title &amp; Description</div>
          <div className="task-col-action">Action</div>
        </div>
        {tasks.map((task) => (
          <div className="task-table-row" key={task.id}>
            <div className="task-col-item">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggle(task)}
                aria-label={`Mark "${task.title}" complete`}
              />
            </div>
            <div className="task-col-body">
              <div className={`task-title${task.completed ? " task-title--done" : ""}`}>{task.title}</div>
              {task.description ? (
                <div className="task-description muted">{task.description}</div>
              ) : null}
              {task.attachment_path ? (
                <div className="task-attachment muted">Attachment: {task.attachment_path}</div>
              ) : null}
            </div>
            <div className="task-col-action">
              <button type="button" className="secondary" onClick={() => remove(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}