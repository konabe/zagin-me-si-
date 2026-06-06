import styled from "@emotion/styled";
import type { Restaurant } from "../types/restaurant";
import { EmptyState } from "./EmptyState";
import { RestaurantCard } from "./RestaurantCard";

type RestaurantListProps = {
  restaurants: Restaurant[];
};

export function RestaurantList({ restaurants }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return <EmptyState />;
  }

  return (
    <Grid data-testid="restaurant-list">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;
