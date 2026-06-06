import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "../../src/App";
import type { Restaurant } from "../../src/types/restaurant";

const sample: Restaurant[] = [
  {
    id: "r001",
    name: "和食A",
    genre: "和食",
    budget: "UNDER_1000",
    description: "和食店です",
    area: "1丁目",
  },
  {
    id: "r002",
    name: "イタリアンA",
    genre: "イタリアン",
    budget: "B_2000_3000",
    description: "イタリアン店です",
    area: "2丁目",
  },
  {
    id: "r003",
    name: "和食B",
    genre: "和食",
    budget: "B_2000_3000",
    description: "もう一つの和食店",
    area: "3丁目",
  },
];

describe("App (integration)", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => sample,
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("起動時に loading を表示し、その後一覧を表示する", async () => {
    render(<App />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId("restaurant-card")).toHaveLength(3);
    });
    expect(screen.getByTestId("result-count")).toHaveTextContent("3 件");
  });

  it("ジャンル選択で絞り込まれる", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId("restaurant-card")).toHaveLength(3);
    });

    const filterPanel = screen.getByTestId("filter-panel");
    await user.click(within(filterPanel).getByText("和食"));

    await waitFor(() => {
      expect(screen.getAllByTestId("restaurant-card")).toHaveLength(2);
    });
    expect(screen.getByTestId("result-count")).toHaveTextContent("2 件");
  });

  it("ジャンル + 予算の AND 絞り込みが機能する", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId("restaurant-card")).toHaveLength(3);
    });

    const filterPanel = screen.getByTestId("filter-panel");
    await user.click(within(filterPanel).getByText("和食"));
    await user.click(within(filterPanel).getByText("2,000〜3,000円"));

    await waitFor(() => {
      expect(screen.getAllByTestId("restaurant-card")).toHaveLength(1);
    });
    expect(screen.getByText("和食B")).toBeInTheDocument();
  });

  it("該当無しの条件では EmptyState を表示する", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId("restaurant-card")).toHaveLength(3);
    });

    const filterPanel = screen.getByTestId("filter-panel");
    await user.click(within(filterPanel).getByText("イタリアン"));
    await user.click(within(filterPanel).getByText("〜1,000円"));

    await waitFor(() => {
      expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    });
    expect(screen.queryAllByTestId("restaurant-card")).toHaveLength(0);
  });

  it("fetch 失敗時はエラーを表示する", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, statusText: "Server Error" }),
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });
});
