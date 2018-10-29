import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const List = () => (
    <Query
    query={gql`
        {
            getInfo(id: 1) {
                name
            }
        }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
        console.log(data)

      return (
        <div>
          <p>{`Episode name: ${data.getInfo.name}`}</p>
        </div>
      );
    }}
  </Query>
)

export default List;