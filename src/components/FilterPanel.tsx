import styled from "@emotion/styled";
import type { BudgetRange, FilterCriteria } from "../types/restaurant";
import { BudgetFilter } from "./BudgetFilter";
import { GenreFilter } from "./GenreFilter";

type FilterPanelProps = {
  availableGenres: string[];
  criteria: FilterCriteria;
  onChange: (criteria: FilterCriteria) => void;
};

export function FilterPanel({ availableGenres, criteria, onChange }: FilterPanelProps) {
  const handleGenresChange = (genres: string[]) => {
    onChange({ ...criteria, genres });
  };

  const handleBudgetChange = (budget: BudgetRange | null) => {
    onChange({ ...criteria, budget });
  };

  return (
    <Panel data-testid="filter-panel">
      <GenreFilter
        selected={criteria.genres}
        available={availableGenres}
        onChange={handleGenresChange}
      />
      <BudgetFilter selected={criteria.budget} onChange={handleBudgetChange} />
    </Panel>
  );
}

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;
