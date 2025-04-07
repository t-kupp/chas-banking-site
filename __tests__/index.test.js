import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getAllByRole("heading", { level: 1 });

    expect(heading.length).toBeGreaterThan(0);
  });

  it("renders a paragraph", () => {
    render(<Home />);

    const paragraph = screen.getAllByRole("paragraph");

    expect(paragraph.length).toBeGreaterThan(0);
  });

  it("renders an image", () => {
    render(<Home />);

    const image = screen.getAllByRole("img");

    expect(image.length).toBeGreaterThan(0);
  });
});
