import React from 'react';
import { StaticMap } from 'react-map-gl';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin } from 'antd';
// @ts-ignore
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import {
  BUILDING_ID_LIST,
  HOUSE_ID_LIST,
  DEMO_HOUSE_HEIGHT,
  BUILDING_HEIGHT,
} from '../constants';
import utils from '../utils';

const DATA_URL = {
  BUILDINGS:
    './salun.geojson',
};

const COLORS = {
  red: [255, 77, 79],
  yellow: [250, 219, 20],
  green: [186, 230, 55],
  gray: [191, 191, 191],
}

const BUILDING_LEVEL_COLOR = {
  0: COLORS.green,
  1: COLORS.yellow,
  2: COLORS.red,
};

const BATTERY_ID_LIST = [
  'D_2_B_1',
  'D_5_B_1',
  'D_3_B_1',
  'D_4_B_1',
  'D_1_B_1',
  'D_6_B_1',
  'D_7_B_1',
];

const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [2.0, 0.0, 1.0, 0.0],
  numberOfLights: 2
};

interface IProps {
  loading: boolean;
  buildingStates: {};
  houseStates: {};
  socket: SocketIOClient.Socket;
}

class Map3D extends React.Component<IProps> {
  state = {
    viewState: {
      latitude: 22.927127,
      longitude: 120.286390,    
      zoom: 15,
      maxZoom: 18,
      pitch: 45,
      bearing: 0
    },
    buildingStates: undefined,
    houseStates: undefined,
  }

  componentDidMount() {
    this.props.socket.on('houseStateAdded', this.handleNewHouseState);
    this.props.socket.on('buildingStateAdded', this.handleNewBuildingState);
  }

  componentWillUnmount() {
    this.props.socket.off('houseStateAdded', this.handleNewHouseState);
    this.props.socket.off('buildingStateAdded', this.handleNewBuildingState);
  }

  handleNewHouseState = (houseStates: any) => {
    this.setState({
      houseStates: utils.reduceBy(houseStates, 'houseID'),
    });
  }

  handleNewBuildingState = (buildingStates: any) => {
    this.setState({
      buildingStates: utils.reduceBy(buildingStates, 'buildingID'),
    });
  }

  handleViewStateChange = ({ viewState }: any) => {
    this.setState({ viewState });
  }

  renderLayers() {
    return [
      new GeoJsonLayer({
        id: 'geojson',
        data: DATA_URL.BUILDINGS,
        opacity:  0.9,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        fp64: true,
        pointRadiusScale: 2,
        getElevation: this.getElevation,
        getFillColor: this.getFillColor,
        getLineColor: [255, 255, 255],
        lightSettings: LIGHT_SETTINGS,
        pickable: true,
        updateTriggers: {
          getFillColor: (f: any) => this.getFillColor(f),
        },
      }),
    ];
  }

  getElevation(f: any) {
    const { name } = f.properties;
    if (name.includes('D_Demo') || BATTERY_ID_LIST.includes(name)) {
      return DEMO_HOUSE_HEIGHT;
    }

    if (BUILDING_ID_LIST.includes(name)) {
      return BUILDING_HEIGHT;
    }

    if (HOUSE_ID_LIST.includes(name)) {
      return 32;
    }
    return 1;
  }

  getFillColor = (f: any) => {
    const { name } = f.properties;
    const buildingStates = this.state.buildingStates || this.props.buildingStates;
    const houseStates = this.state.houseStates || this.props.houseStates;
    if (BATTERY_ID_LIST.includes(name)) {
      return COLORS.green;
    }

    if (Object.prototype.hasOwnProperty.call(buildingStates, name)) {
      const { powerUsageLevel } = buildingStates[name];
      return BUILDING_LEVEL_COLOR[powerUsageLevel];
    }

    if (Object.prototype.hasOwnProperty.call(houseStates, name)) {
      const { isAtHome } = houseStates[name];
      if (isAtHome) {
        return COLORS.yellow;
      }
    }
    return COLORS.gray;
  }

  render() {
    if (this.props.loading) {
      return (<Spin />);  
    }

    return (
      <DeckGL
        layers={this.renderLayers()}
        viewState={this.state.viewState}
        onViewStateChange={this.handleViewStateChange}
        controller
      >
        {/* 
        // @ts-ignore */} 
        <StaticMap
          reuseMaps
          mapStyle="mapbox://styles/mapbox/dark-v9"
          preventStyleDiffing={true}
        />
      </DeckGL>
    );
  }
};


const houseStateGQL = gql`
query getHouseStates($filter: Filter){
  houseStates: getHouseStates(
    filter: $filter
  ) {
    houseID,
    isAtHome
    createdAt
  }
}
`;

const houseStateQuery = graphql(houseStateGQL, {
  props: ({ data: { loading, houseStates = [] } }: any) => ({
    loading,
    houseStates: utils.reduceBy(houseStates, 'houseID'),
  }),
  options: (props) => ({
    variables: {
      filter: {
        // FIX: use 15mins ago
        createdAt_gte: '2015/1/31',
      }
    },
  }),
});

const buildingStateGQL = gql`
query getBuildingStates($filter: Filter){
  buildingStates: getBuildingStates(
    filter: $filter
  ) {
    buildingID,
    powerUsageLevel,
    createdAt
  }
}
`;

const buildingStateQuery = graphql(buildingStateGQL, {
  props: ({ data: { loading, buildingStates = [] } }: any) => ({
    loading,
    buildingStates: utils.reduceBy(buildingStates, 'buildingID'),
  }),
  options: (props) => ({
    variables: {
      filter: {
        // FIX: use 15mins ago
        createdAt_gte: '2015/1/31',
      }
    },
  }),
});

export default compose(buildingStateQuery, houseStateQuery)(Map3D);
