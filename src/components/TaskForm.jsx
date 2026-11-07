import { useState } from "react";
import { api } from "../api/client.js";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setError(null);
    try {
      if (file) {
        const form = new FormData();
        form.append("title", title.trim());
        if (description.trim()) form.append("description", description.trim());
        form.append("file", file);
        await api.createTaskWithAttachment(form);
      } else {
        await api.createTask({
          title: title.trim(),
          description: description.trim() || undefined,
        });
      }
      setTitle("");
      setDescription("");
      setFile(null);
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create task");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>New task</h2>
      <p className="muted">Tasks are stored via the FastAPI BackEnd (Postgres in later labs).</p>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginTop: "0.35rem" }}
        />
      </label>
      <label style={{ display: "block", marginTop: "0.75rem" }}>
        Attachment (optional)
        <input
          type="file"
          style={{ marginTop: "0.35rem" }}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={busy} style={{ marginTop: "0.75rem" }}>
        {busy ? "Saving…" : "Add task"}
      </button>
    </form>
  );
}
