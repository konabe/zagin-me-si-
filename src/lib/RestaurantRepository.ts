import type { Restaurant } from "../types/restaurant";

export class RestaurantRepository {
  private readonly dataUrl: string;

  constructor(dataUrl: string) {
    this.dataUrl = dataUrl;
  }

  async loadAll(): Promise<Restaurant[]> {
    const response = await fetch(this.dataUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to load restaurants from ${this.dataUrl}: ${response.status} ${response.statusText}`,
      );
    }
    const data = (await response.json()) as Restaurant[];
    return data;
  }
}
