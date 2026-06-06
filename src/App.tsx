import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { FilterPanel } from "./components/FilterPanel";
import { RestaurantList } from "./components/RestaurantList";
import { RestaurantRepository } from "./lib/RestaurantRepository";
import { RestaurantSearchService } from "./lib/RestaurantSearchService";
import type { FilterCriteria, Restaurant } from "./types/restaurant";

const DATA_URL = "/data/restaurants.json";

export function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [criteria, setCriteria] = useState<FilterCriteria>({ genres: [], budget: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const repo = new RestaurantRepository(DATA_URL);
    repo
      .loadAll()
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });
  }, []);

  const service = useMemo(() => new RestaurantSearchService(restaurants), [restaurants]);
  const availableGenres = useMemo(() => service.getAvailableGenres(), [service]);
  const filtered = useMemo(() => service.filter(criteria), [service, criteria]);

  return (
    <>
      <Global styles={globalStyles} />
      <Page>
        <Header>
          <Title>銀座 飯 探し</Title>
          <Subtitle>職場が銀座にある人のためのランチ場所探し</Subtitle>
        </Header>

        <Main>
          {loading && <Status data-testid="loading">読み込み中...</Status>}

          {error && (
            <Status data-testid="error" role="alert">
              データの読み込みに失敗しました: {error.message}
            </Status>
          )}

          {!loading && !error && (
            <Layout>
              <Aside>
                <FilterPanel
                  availableGenres={availableGenres}
                  criteria={criteria}
                  onChange={setCriteria}
                />
                <ResultCount data-testid="result-count">{filtered.length} 件</ResultCount>
              </Aside>
              <Content>
                <RestaurantList restaurants={filtered} />
              </Content>
            </Layout>
          )}
        </Main>
      </Page>
    </>
  );
}

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family:
      -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic UI", "Segoe UI", Roboto,
      sans-serif;
    background-color: #f7f7f8;
    color: #1a1a1a;
    line-height: 1.5;
  }
`;

const Page = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 24px 16px;
  background-color: #1a1a1a;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: #bbb;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Content = styled.div`
  min-width: 0;
`;

const ResultCount = styled.div`
  padding: 8px 16px;
  font-size: 13px;
  color: #666;
  text-align: right;
`;

const Status = styled.div`
  padding: 48px 16px;
  text-align: center;
  color: #666;
`;
