import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RestaurantCard } from "../../src/components/RestaurantCard";
import type { Restaurant } from "../../src/types/restaurant";

const restaurant: Restaurant = {
  id: "r001",
  name: "テスト店",
  genre: "和食",
  budget: "B_1000_2000",
  description: "おいしい店です",
  area: "銀座1丁目",
};

describe("RestaurantCard", () => {
  it("店名・ジャンル・予算ラベル・紹介文・エリアを表示する", () => {
    render(<RestaurantCard restaurant={restaurant} />);

    expect(screen.getByText("テスト店")).toBeInTheDocument();
    expect(screen.getByText("和食")).toBeInTheDocument();
    expect(screen.getByText("1,000〜2,000円")).toBeInTheDocument();
    expect(screen.getByText("おいしい店です")).toBeInTheDocument();
    expect(screen.getByText("銀座1丁目")).toBeInTheDocument();
  });

  it("data-testid と data-restaurant-id を持つ", () => {
    render(<RestaurantCard restaurant={restaurant} />);
    const card = screen.getByTestId("restaurant-card");
    expect(card).toHaveAttribute("data-restaurant-id", "r001");
  });
});
