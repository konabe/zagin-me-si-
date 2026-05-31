import styled from "@emotion/styled";

type GenreFilterProps = {
  selected: string[];
  available: string[];
  onChange: (selected: string[]) => void;
};

export function GenreFilter({ selected, available, onChange }: GenreFilterProps) {
  const toggle = (genre: string) => {
    if (selected.includes(genre)) {
      onChange(selected.filter((g) => g !== genre));
    } else {
      onChange([...selected, genre]);
    }
  };

  return (
    <Container data-testid="genre-filter">
      <Title>ジャンル</Title>
      <Options>
        {available.map((genre) => {
          const isSelected = selected.includes(genre);
          return (
            <Option key={genre}>
              <HiddenInput
                type="checkbox"
                data-testid="genre-filter-checkbox"
                value={genre}
                checked={isSelected}
                onChange={() => toggle(genre)}
              />
              <Chip selected={isSelected}>{genre}</Chip>
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
  border: 1px solid ${({ selected }) => (selected ? "#1565c0" : "#ccc")};
  background-color: ${({ selected }) => (selected ? "#1565c0" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  transition: all 0.15s ease;
  user-select: none;

  &:hover {
    border-color: #1565c0;
  }
`;
