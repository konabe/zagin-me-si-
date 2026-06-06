import styled from "@emotion/styled";
import { BUDGET_RANGES, type BudgetRange } from "../types/restaurant";

type BudgetFilterProps = {
  selected: BudgetRange | null;
  onChange: (selected: BudgetRange | null) => void;
};

export function BudgetFilter({ selected, onChange }: BudgetFilterProps) {
  return (
    <Container data-testid="budget-filter">
      <Title>予算</Title>
      <Options>
        <Option>
          <HiddenInput
            type="radio"
            name="budget"
            data-testid="budget-filter-radio"
            value=""
            checked={selected === null}
            onChange={() => onChange(null)}
          />
          <Chip selected={selected === null}>指定なし</Chip>
        </Option>
        {BUDGET_RANGES.map((b) => {
          const isSelected = selected === b.value;
          return (
            <Option key={b.value}>
              <HiddenInput
                type="radio"
                name="budget"
                data-testid="budget-filter-radio"
                value={b.value}
                checked={isSelected}
                onChange={() => onChange(b.value)}
              />
              <Chip selected={isSelected}>{b.label}</Chip>
            </Option>
          );
        })}
      </Options>
    </Container>
  );
}

const Container = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

const Title = styled.legend`
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Option = styled.label`
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Chip = styled.span<{ selected: boolean }>`
  display: inline-block;
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 16px;
  border: 1px solid ${({ selected }) => (selected ? "#e65100" : "#ccc")};
  background-color: ${({ selected }) => (selected ? "#e65100" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  transition: all 0.15s ease;
  user-select: none;

  &:hover {
    border-color: #e65100;
  }
`;
