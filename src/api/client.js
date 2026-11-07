const base = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, init) {
  const res = await fetch(`${base}${path}`, {
    headers: { Accept: "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  if (res.status === 204) {
    return undefined;
  }
  return res.json();
}

export const api = {
  listTasks: () => request("/tasks"),
  getStats: () => request("/tasks/stats"),
  createTask: (body) =>
    request("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  updateTask: (id, body) =>
    request(`/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  deleteTask: (id) => request(`/tasks/${id}`, { method: "DELETE" }),
  createTaskWithAttachment: (form) =>
    request("/tasks/with-attachment", { method: "POST", body: form }),
};
