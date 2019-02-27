import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch'

export default class MemberPage extends Component {
  static async getInitialProps({ query }) {
    const [
      footer,
      member
    ] = await Promise.all([
      fetch(`https://ginetta.cockpit.rocks/cockpitql/api/singletons/get/footer?simple=1&token=account-1f4269e927c90b0a0474f4796187c8`)
        .then(res => res.json()),
      fetch(`https://ginetta.cockpit.rocks/cockpitql/api/collections/get/members?simple=1&filter[_id]=${query.slug}&token=account-1f4269e927c90b0a0474f4796187c8`)
        .then(res => res.json())
    ]);


    console.log(footer, member);

    return {
      footer,
      member
    };
  }

  render() {
    return (
      <pre>
        {JSON.stringify(this.props, null, 2)}
      </pre>
    )
  }
};
