import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

export const FOOTER_QUERY = gql`
{
  singleton(name: "footer")
}
`

const Footer = styled.footer`
  background: #161616;
  color: white;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: .5rem;
  padding-right: .5rem;
`;

const UnstyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const GridList = styled(UnstyledList)`
  // override default list styles

  // grid styling
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;

  > li {
    padding-left: 1rem;
    padding-right: 2rem;
  }
`;

export default () => (
  <Query query={FOOTER_QUERY}>
    {({ data, loading, error }) => {
      if (loading || error || !data) {
        return null;
      }

      const { singleton: { microsites, socialMedia } } = data;

      return (
        <Footer>
          <Container>
            <GridList>
              <li>
                <UnstyledList>
                  {microsites.map(({ value: { title, url } }, index) => (
                    <li key={index}>
                      <a href={url}>{title}</a>
                    </li>
                  ))}
                </UnstyledList>
              </li>
              <li>
                <UnstyledList>
                  {socialMedia.map(({ value: { title, url } }, index) => (
                    <li key={index}>
                      <a href={url}>{title}</a>
                    </li>
                  ))}
                </UnstyledList>
              </li>
            </GridList>
          </Container>
        </Footer>
      );
    }}
  </Query>
)
