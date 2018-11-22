import * as React from 'react';
import { Query } from 'react-apollo';
import { Row } from 'antd';
import gql from 'graphql-tag';

import Markers from '../components/Makers';
import MapLayer from '../components/MapLayer';

class Map extends React.Component {
  handleClick = () => {
    console.log(123);
  }

  render() {
    return (
      <Query
        query={query}
      >{({ loading, error, data }) => {
        if (loading) {
          return (<div />);
        }
        return (
          <React.Fragment>
            <Row style={{ backgroundColor: '#fff', padding: 10 }}>
              <MapLayer
                render={() =>
                  <Markers
                    locations={data.Houses}
                    onClick={this.handleClick}
                  />
                }
              />
            </Row>
          </React.Fragment>
        )
      }}
    </Query>
    );
  }
};

const query = gql`
{
  Houses {
    dataid,
    lat,
    lng
  }
}
`;

export default Map;
