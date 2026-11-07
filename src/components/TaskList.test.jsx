import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskList from "./TaskList.jsx";

vi.mock("../api/client.js", () => ({
  api: {
    updateTask: vi.fn().mockResolvedValue({}),
    deleteTask: vi.fn().mockResolvedValue(undefined),
  },
}));

const sampleTasks = [
  {
    id: 1,
    title: "Write tests",
    description: "CI on main",
    completed: false,
    attachment_path: null,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

describe("TaskList", () => {
  it("renders column headers and task rows", () => {
    render(<TaskList tasks={sampleTasks} loading={false} onChange={() => {}} />);

    expect(screen.getByText("Item")).toBeInTheDocument();
    expect(screen.getByText("Title & Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("CI on main")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<TaskList tasks={[]} loading onChange={() => {}} />);
    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
  });

  it("calls onChange when delete is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { api } = await import("../api/client.js");

    render(<TaskList tasks={sampleTasks} loading={false} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(api.deleteTask).toHaveBeenCalledWith(1);
    expect(onChange).toHaveBeenCalled();
  });
});
