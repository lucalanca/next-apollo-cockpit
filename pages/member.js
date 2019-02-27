import React, { Component } from 'react';
import Footer from '../components/Footer';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const MemberQuery = gql`
  query GetMemberById($id: String!) {
    allMembers(filter: { _id: $id }) {
      _id
      firstname
      lastname
    }
  }
`


export default class MemberPage extends Component {
  static async getInitialProps({ query }) {
    return {
      query
    };
  }

  render() {
    return (
      <Query query={MemberQuery} variables={{ id: this.props.query.slug }}>
        {({ data, loading, error }) => {
          if (loading || error || !data) {
            return null;
          }

          const { allMembers } = data;

          if (allMembers.length === 0) {
            return (
              <pre>{JSON.stringify({ data, allMembers, props: this.props }, null, 2)}</pre>
            )
            throw new Error('404: Not found');
          }

          if (allMembers.length > 1) {
            throw new Error('500: Something went wrong');
          }

          const member = allMembers[0];

          return (
            <>
              <h1>Ginetta</h1>
              <pre>{JSON.stringify({
                member
              }, null, 2)}</pre>
              <Footer />
            </>
          )
        }}
      </Query>
    )
  }
};
