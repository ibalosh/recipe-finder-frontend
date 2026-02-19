import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders an accessible footer landmark", () => {
    render(<Footer />);

    expect(
      screen.getByRole("contentinfo", { name: /recipe finder footer/i }),
    ).toBeInTheDocument();
  });
});
