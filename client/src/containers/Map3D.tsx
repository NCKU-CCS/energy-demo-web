import * as React from 'react';

import {StaticMap} from 'react-map-gl';
// @ts-ignore
import DeckGL, {GeoJsonLayer, PointCloudLayer, IconLayer} from 'deck.gl';


const DATA_URL = {
  BUILDINGS:
    './salun.geojson',
};

// @ts-ignore
const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [2.0, 0.0, 1.0, 0.0],
  numberOfLights: 2
};

interface IProps {
  buildings: string;
}

class Map3D extends React.Component<IProps> {
  state = {
    viewState: {
      latitude: 22.927127,
      longitude: 120.286390,    
      zoom: 14,
      maxZoom: 18,
      pitch: 45,
      bearing: 0
    },
  }

  renderLayers() {
    const {buildings = DATA_URL.BUILDINGS} = this.props;

    return [
      new GeoJsonLayer({
        id: 'geojson',
        data: buildings,
        opacity:  0.7,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        fp64: true,
        pointRadiusScale: 2,
        getElevation: (f: any) => {
          const { name } = f.properties;
          if (name.includes('D_B')) {
            return 70;
          }
          console.log(name.split('_'));
          if (name.split('_').length >= 3 || name.includes('D_Demo')) {
            return 20;
          }
          return 1;
        },
        getFillColor: (f: any) => {
          const { name } = f.properties;
          // if (name.split('_').length > 2 || name.includes('D_Demo')) {
          //   return [75, 228, 89];
          // }
          console.log(name.split('_'));
          if (name.split('_').length >= 3) {
            if (Math.random() > 0.3) {
              return [75, 228, 89];
            } else {
              return [252, 78, 42];
            }
          }
          return [74, 80, 87];
        },
        getLineColor: [255, 255, 255],
        lightSettings: LIGHT_SETTINGS,
        pickable: true,
      }),
    ];
  }

  handleViewStateChange = ({ viewState }: any) => {
    this.setState({viewState});
  }

  render() {
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

export default Map3D;
