import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "../../src/components/EmptyState";

describe("EmptyState", () => {
  it("デフォルトメッセージを表示する", () => {
    render(<EmptyState />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText(/条件に合うランチ店が見つかりませんでした/)).toBeInTheDocument();
  });

  it("カスタムメッセージが渡されるとそれを表示する", () => {
    render(<EmptyState message="カスタムメッセージ" />);
    expect(screen.getByText("カスタムメッセージ")).toBeInTheDocument();
  });
});
