import React from 'react';
import ReactMapGL from 'react-map-gl';
import { Viewport } from 'csstype';
// @ts-ignore
import { SizeMe } from 'react-sizeme';

interface IProps {
  render: (viewport: any, size: { width: number, height: number }) => React.ReactNode;
}

class MapLayer extends React.Component<IProps> {
  state = {
    viewport: {
      width: 600,
      height: 700,
      latitude: 22.927127,
      longitude: 120.286390,
      zoom: 14.5
    },
  };

  handleUpdateViewPort = (viewport: Viewport) => {
    this.setState({ viewport });
  }

  render() {
    return (
      <SizeMe>
        {({ size }: any) =>
          <ReactMapGL
            {...this.state.viewport}
            width={size.width}
            onViewportChange={this.handleUpdateViewPort}
          >
            { this.props.render(this.state.viewport, size) }
          </ReactMapGL>
        }
      </SizeMe>
    );
  }
};

export default MapLayer;
