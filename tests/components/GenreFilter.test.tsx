import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GenreFilter } from "../../src/components/GenreFilter";

describe("GenreFilter", () => {
  it("全ジャンルをチェックボックスとして表示する", () => {
    render(<GenreFilter selected={[]} available={["和食", "中華"]} onChange={() => {}} />);
    expect(screen.getByText("和食")).toBeInTheDocument();
    expect(screen.getByText("中華")).toBeInTheDocument();
    expect(screen.getAllByTestId("genre-filter-checkbox")).toHaveLength(2);
  });

  it("選択中のジャンルにチェックが入っている", () => {
    render(<GenreFilter selected={["和食"]} available={["和食", "中華"]} onChange={() => {}} />);
    const checkboxes = screen.getAllByTestId("genre-filter-checkbox") as HTMLInputElement[];
    expect(checkboxes[0]?.checked).toBe(true);
    expect(checkboxes[1]?.checked).toBe(false);
  });

  it("クリックで未選択ジャンルが追加される", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<GenreFilter selected={[]} available={["和食", "中華"]} onChange={onChange} />);

    await user.click(screen.getByText("中華"));
    expect(onChange).toHaveBeenCalledWith(["中華"]);
  });

  it("クリックで選択中ジャンルが削除される", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <GenreFilter selected={["和食", "中華"]} available={["和食", "中華"]} onChange={onChange} />,
    );

    await user.click(screen.getByText("和食"));
    expect(onChange).toHaveBeenCalledWith(["中華"]);
  });
});
