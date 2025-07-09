import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Vite + React"
    );
  });

  it("shows the count button", () => {
    render(<App />);
    expect(screen.getByRole("button")).toHaveTextContent("count is 0");
  });
});
