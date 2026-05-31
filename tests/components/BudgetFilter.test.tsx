import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BudgetFilter } from "../../src/components/BudgetFilter";

describe("BudgetFilter", () => {
  it("全予算帯 + 指定なしを表示する", () => {
    render(<BudgetFilter selected={null} onChange={() => {}} />);
    expect(screen.getByText("指定なし")).toBeInTheDocument();
    expect(screen.getByText("〜1,000円")).toBeInTheDocument();
    expect(screen.getByText("1,000〜2,000円")).toBeInTheDocument();
    expect(screen.getByText("2,000〜3,000円")).toBeInTheDocument();
    expect(screen.getByText("3,000円〜")).toBeInTheDocument();
  });

  it("selected が null の場合、指定なしが選択状態", () => {
    render(<BudgetFilter selected={null} onChange={() => {}} />);
    const radios = screen.getAllByTestId("budget-filter-radio") as HTMLInputElement[];
    expect(radios[0]?.checked).toBe(true);
  });

  it("予算帯を選ぶと onChange に値が渡る", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BudgetFilter selected={null} onChange={onChange} />);

    await user.click(screen.getByText("1,000〜2,000円"));
    expect(onChange).toHaveBeenCalledWith("B_1000_2000");
  });

  it("指定なしを選ぶと onChange に null が渡る", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BudgetFilter selected="B_1000_2000" onChange={onChange} />);

    await user.click(screen.getByText("指定なし"));
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
