import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterPanel } from "../../src/components/FilterPanel";

describe("FilterPanel", () => {
  it("GenreFilter と BudgetFilter を内包する", () => {
    render(
      <FilterPanel
        availableGenres={["和食"]}
        criteria={{ genres: [], budget: null }}
        onChange={() => {}}
      />,
    );
    expect(screen.getByTestId("filter-panel")).toBeInTheDocument();
    expect(screen.getByTestId("genre-filter")).toBeInTheDocument();
    expect(screen.getByTestId("budget-filter")).toBeInTheDocument();
  });

  it("ジャンル変更時、criteria のジャンルだけを差し替えて通知する", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FilterPanel
        availableGenres={["和食"]}
        criteria={{ genres: [], budget: "B_1000_2000" }}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByText("和食"));
    expect(onChange).toHaveBeenCalledWith({ genres: ["和食"], budget: "B_1000_2000" });
  });

  it("予算変更時、criteria の予算だけを差し替えて通知する", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FilterPanel
        availableGenres={["和食"]}
        criteria={{ genres: ["和食"], budget: null }}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByText("1,000〜2,000円"));
    expect(onChange).toHaveBeenCalledWith({ genres: ["和食"], budget: "B_1000_2000" });
  });
});
