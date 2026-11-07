import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import App from "./App.jsx";

function renderApp(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App", () => {
  it("renders the TaskTracker title", () => {
    renderApp();
    expect(screen.getByRole("heading", { level: 1, name: "TaskTracker" })).toBeInTheDocument();
  });

  it("shows navigation links", () => {
    renderApp();
    expect(screen.getByRole("link", { name: "Tasks" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Stats" })).toBeInTheDocument();
  });
});
