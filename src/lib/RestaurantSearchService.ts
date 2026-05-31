import type { FilterCriteria, Restaurant } from "../types/restaurant";

export class RestaurantSearchService {
  private readonly restaurants: readonly Restaurant[];

  constructor(restaurants: readonly Restaurant[]) {
    this.restaurants = restaurants;
  }

  getAll(): readonly Restaurant[] {
    return this.restaurants;
  }

  getAvailableGenres(): string[] {
    const set = new Set<string>();
    for (const r of this.restaurants) {
      set.add(r.genre);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ja"));
  }

  filter(criteria: FilterCriteria): Restaurant[] {
    return this.restaurants.filter((r) => {
      const matchesGenre = criteria.genres.length === 0 || criteria.genres.includes(r.genre);
      const matchesBudget = criteria.budget === null || criteria.budget === r.budget;
      return matchesGenre && matchesBudget;
    });
  }
}
