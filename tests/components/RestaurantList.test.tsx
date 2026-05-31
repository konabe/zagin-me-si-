import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RestaurantList } from "../../src/components/RestaurantList";
import type { Restaurant } from "../../src/types/restaurant";

const sample: Restaurant[] = [
  {
    id: "r001",
    name: "店A",
    genre: "和食",
    budget: "UNDER_1000",
    description: "",
    area: "1丁目",
  },
  {
    id: "r002",
    name: "店B",
    genre: "中華",
    budget: "B_1000_2000",
    description: "",
    area: "2丁目",
  },
];

describe("RestaurantList", () => {
  it("店舗カードを件数分描画する", () => {
    render(<RestaurantList restaurants={sample} />);
    expect(screen.getAllByTestId("restaurant-card")).toHaveLength(2);
    expect(screen.getByText("店A")).toBeInTheDocument();
    expect(screen.getByText("店B")).toBeInTheDocument();
  });

  it("配列が空のときは EmptyState を表示する", () => {
    render(<RestaurantList restaurants={[]} />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("restaurant-list")).not.toBeInTheDocument();
  });
});
