import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Row } from 'antd';

// @ts-ignore
import HeatmapOverlay from 'react-map-gl-heatmap-overlay';
import MapLayer from '../components/MapLayer';

class Heatmap extends React.Component {
  render() {
    return (
      <Query
        query={query}
        variables={{
          filter: {
          // FIX: use today
          createdAt_gte: '2015/1/30',
        }}}
      >{({ loading, error, data }) => {
        if (loading) {
          return (<div />);
        }
        return (
          <React.Fragment>
            <Row style={{ backgroundColor: '#fff', padding: 10 }}>
              <MapLayer render={(viewport) => (
                <HeatmapOverlay
                  {...viewport}
                  locations={data.houses || []}
                  intensityAccessor={(house: any) => house.reducedHouseState ? house.reducedHouseState.powerUsage : 0} 
                  lngLatAccessor={(house: any) => [house.lng, house.lat ]}
                />
                )}
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
query getHouses($filter: Filter) {
  houses: Houses(filter: $filter) {
    houseID,
    lat,
    lng,
    reducedHouseState {
      powerUsage
    }
  }
}
`;

export default Heatmap;
