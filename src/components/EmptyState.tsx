import styled from "@emotion/styled";

type EmptyStateProps = {
  message?: string;
};

export function EmptyState({
  message = "条件に合うランチ店が見つかりませんでした。条件を変えて再度お試しください。",
}: EmptyStateProps) {
  return (
    <Container data-testid="empty-state" role="status">
      <Icon aria-hidden="true">🍽️</Icon>
      <Message>{message}</Message>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background-color: #fafafa;
  border-radius: 8px;
  color: #666;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
  line-height: 1.6;
`;
