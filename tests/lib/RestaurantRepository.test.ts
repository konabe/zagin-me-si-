import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RestaurantRepository } from "../../src/lib/RestaurantRepository";
import type { Restaurant } from "../../src/types/restaurant";

const sample: Restaurant[] = [
  {
    id: "1",
    name: "店A",
    genre: "和食",
    budget: "UNDER_1000",
    description: "desc",
    area: "1丁目",
  },
];

describe("RestaurantRepository", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("URL から JSON を取得して配列で返す", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => sample,
    });

    const repo = new RestaurantRepository("/data/restaurants.json");
    const result = await repo.loadAll();

    expect(fetch).toHaveBeenCalledWith("/data/restaurants.json");
    expect(result).toEqual(sample);
  });

  it("レスポンスが ok でない場合は例外を投げる", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const repo = new RestaurantRepository("/data/missing.json");
    await expect(repo.loadAll()).rejects.toThrow(/Failed to load restaurants/);
  });

  it("fetch 自体が失敗した場合は例外をそのまま伝播する", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("network down"));

    const repo = new RestaurantRepository("/data/restaurants.json");
    await expect(repo.loadAll()).rejects.toThrow("network down");
  });
});
