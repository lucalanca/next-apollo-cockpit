import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { Link } from '../../routes'

import FooterRest from '../../components/FooterRest';

export default class HomePage extends Component {
  static async getInitialProps({ query }) {
    const [
      footer,
      members
    ] = await Promise.all([
      fetch(`https://ginetta.cockpit.rocks/cockpitql/api/singletons/get/footer?simple=1&token=account-1f4269e927c90b0a0474f4796187c8`)
        .then(res => res.json()),
      fetch(`https://ginetta.cockpit.rocks/cockpitql/api/collections/get/members?simple=1&token=account-1f4269e927c90b0a0474f4796187c8`)
        .then(res => res.json())
    ]);


    console.log(footer, members);

    return {
      footer,
      members
    };
  }
  render() {
    const { footer, members } = this.props;
    return (
      <div>
        <h1>Ginetta</h1>

        <h2>Team</h2>
        <ul>
          {members.map(({ _id, firstname, lastname }) => (
            <li key={_id}>
              <article>
                <Link route='rest-member' params={{ slug: _id }}>
                  <a>{firstname} {lastname} ({_id})</a>
                </Link>
              </article>
            </li>
          ))}
        </ul>
        <FooterRest {...footer} />
      </div>

    )
  }

};
