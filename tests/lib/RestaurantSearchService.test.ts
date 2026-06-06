import { describe, expect, it } from "vitest";
import { RestaurantSearchService } from "../../src/lib/RestaurantSearchService";
import type { Restaurant } from "../../src/types/restaurant";

const sample: Restaurant[] = [
  {
    id: "1",
    name: "和食A",
    genre: "和食",
    budget: "UNDER_1000",
    description: "",
    area: "1丁目",
  },
  {
    id: "2",
    name: "和食B",
    genre: "和食",
    budget: "B_1000_2000",
    description: "",
    area: "2丁目",
  },
  {
    id: "3",
    name: "イタリアンA",
    genre: "イタリアン",
    budget: "B_2000_3000",
    description: "",
    area: "3丁目",
  },
  {
    id: "4",
    name: "中華A",
    genre: "中華",
    budget: "OVER_3000",
    description: "",
    area: "4丁目",
  },
  {
    id: "5",
    name: "中華B",
    genre: "中華",
    budget: "UNDER_1000",
    description: "",
    area: "5丁目",
  },
];

describe("RestaurantSearchService", () => {
  describe("getAll", () => {
    it("コンストラクタで渡した全店舗を返す", () => {
      const service = new RestaurantSearchService(sample);
      expect(service.getAll()).toHaveLength(5);
    });

    it("空配列が渡された場合は空配列を返す", () => {
      const service = new RestaurantSearchService([]);
      expect(service.getAll()).toEqual([]);
    });
  });

  describe("getAvailableGenres", () => {
    it("重複を除いたジャンル一覧を返す", () => {
      const service = new RestaurantSearchService(sample);
      const genres = service.getAvailableGenres();
      expect(genres).toHaveLength(3);
      expect(genres).toContain("和食");
      expect(genres).toContain("イタリアン");
      expect(genres).toContain("中華");
    });

    it("日本語でソートされた順で返す", () => {
      const service = new RestaurantSearchService(sample);
      const genres = service.getAvailableGenres();
      const sorted = [...genres].sort((a, b) => a.localeCompare(b, "ja"));
      expect(genres).toEqual(sorted);
    });

    it("空配列のサービスでは空配列を返す", () => {
      const service = new RestaurantSearchService([]);
      expect(service.getAvailableGenres()).toEqual([]);
    });
  });

  describe("filter", () => {
    const service = new RestaurantSearchService(sample);

    it("空 criteria(全 null/空) はすべて返す", () => {
      const result = service.filter({ genres: [], budget: null });
      expect(result).toHaveLength(5);
    });

    it("ジャンル単独で絞り込む", () => {
      const result = service.filter({ genres: ["和食"], budget: null });
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.genre === "和食")).toBe(true);
    });

    it("複数ジャンルの OR で絞り込む", () => {
      const result = service.filter({ genres: ["和食", "中華"], budget: null });
      expect(result).toHaveLength(4);
    });

    it("予算単独で絞り込む", () => {
      const result = service.filter({ genres: [], budget: "UNDER_1000" });
      expect(result).toHaveLength(2);
      expect(result.every((r) => r.budget === "UNDER_1000")).toBe(true);
    });

    it("ジャンルと予算の AND で絞り込む", () => {
      const result = service.filter({ genres: ["中華"], budget: "UNDER_1000" });
      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe("5");
    });

    it("該当無しの場合は空配列を返す", () => {
      const result = service.filter({ genres: ["イタリアン"], budget: "UNDER_1000" });
      expect(result).toEqual([]);
    });

    it("元配列を破壊しない", () => {
      const before = [...sample];
      service.filter({ genres: ["和食"], budget: "UNDER_1000" });
      expect(sample).toEqual(before);
    });
  });
});
