import { Link } from '../routes'
import Footer from '../components/Footer';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const HOME_QUERY = gql`
{
  allMembers {
    _id
    firstname
    lastname
  }
  allClients {
    _id
    name
    logo {
      path
    }
  }
}
`


export default function HomePage() {
  return (
    <Query query={HOME_QUERY}>
      {({ data, loading, error }) => {
        if (loading || error || !data) {
          return null;
        }

        const { allMembers, allClients } = data;

        return (
          <>
            <h1>Ginetta</h1>

            <h2>Team</h2>
            <ul>
              {allMembers.map(({ _id, firstname, lastname, picture }) => (
                <li key={_id}>
                  <article>
                    <Link route='member' params={{ slug: _id }}>
                      <a>{firstname} {lastname} ({_id})</a>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
            <pre>{JSON.stringify({
              allClients
            }, null, 2)}</pre>
            <Footer />
          </>
        )
      }}
    </Query>
  )
};
