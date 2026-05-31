export type BudgetRange = "UNDER_1000" | "B_1000_2000" | "B_2000_3000" | "OVER_3000";

export type Restaurant = {
  id: string;
  name: string;
  genre: string;
  budget: BudgetRange;
  description: string;
  area: string;
  lat?: number;
  lng?: number;
};

export type FilterCriteria = {
  genres: string[];
  budget: BudgetRange | null;
};

export type BudgetRangeOption = {
  value: BudgetRange;
  label: string;
};

export const BUDGET_RANGES: readonly BudgetRangeOption[] = [
  { value: "UNDER_1000", label: "〜1,000円" },
  { value: "B_1000_2000", label: "1,000〜2,000円" },
  { value: "B_2000_3000", label: "2,000〜3,000円" },
  { value: "OVER_3000", label: "3,000円〜" },
] as const;
