import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the footer text", () => {
    render(<Footer />);

    expect(
      screen.getByText(/recipe finder\. made with .* fresh ingredients\./i),
    ).toBeInTheDocument();
  });
});
