import styled from "@emotion/styled";
import { BUDGET_RANGES, type Restaurant } from "../types/restaurant";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

function budgetLabel(value: Restaurant["budget"]): string {
  return BUDGET_RANGES.find((b) => b.value === value)?.label ?? value;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card data-testid="restaurant-card" data-restaurant-id={restaurant.id}>
      <Header>
        <Name>{restaurant.name}</Name>
        <Area>{restaurant.area}</Area>
      </Header>
      <Meta>
        <Badge data-testid="restaurant-card-genre">{restaurant.genre}</Badge>
        <Badge data-testid="restaurant-card-budget" variant="budget">
          {budgetLabel(restaurant.budget)}
        </Badge>
      </Meta>
      <Description>{restaurant.description}</Description>
    </Card>
  );
}

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`;

const Area = styled.span`
  font-size: 12px;
  color: #888;
  flex-shrink: 0;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.span<{ variant?: "budget" }>`
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  border-radius: 12px;
  background-color: ${({ variant }) => (variant === "budget" ? "#fff3e0" : "#e3f2fd")};
  color: ${({ variant }) => (variant === "budget" ? "#e65100" : "#1565c0")};
`;

const Description = styled.p`
  margin: 0;
  font-size: 13px;
  color: #555;
  line-height: 1.6;
`;
