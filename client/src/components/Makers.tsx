import React from 'react';
import { CanvasOverlay, CanvasRedrawOptions, Marker } from 'react-map-gl';

interface ILocation {
  lat: number;
  lng: number;
}

interface IProps {
  locations: [ILocation];
  onClick: () => void;
}

class Markers extends React.PureComponent<IProps> {

  redraw = ({width, height, ctx, project, unproject}: CanvasRedrawOptions) => {
    const {
      locations,
    } = this.props;
    const dotRadius = 5;
    const dotFill = '#1890ff';
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    for (const location of locations) {
      const pixel = project([location.lng, location.lat]);
      const pixelRounded = [round(pixel[0], 1), round(pixel[1], 1)];
      if (pixelRounded[0] + dotRadius >= 0 &&
          pixelRounded[0] - dotRadius < width &&
          pixelRounded[1] + dotRadius >= 0 &&
          pixelRounded[1] - dotRadius < height
      ) {
        ctx.fillStyle = dotFill;
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        ctx.arc(pixelRounded[0], pixelRounded[1], dotRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <CanvasOverlay
          redraw={this.redraw}
        />
        {
          this.props.locations.map((l, i) => (
            <Marker key={`${l.lat}${l.lng}`} latitude={l.lat} longitude={l.lng}>
              <div onClick={this.props.onClick} style={{ opacity: 0, width: 5, height: 5, }} />
            </Marker>
          ))
        }
      </React.Fragment>
    );
  }
};

function round(x: number, n: number) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

export default Markers;
