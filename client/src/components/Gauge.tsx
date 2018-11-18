import React from 'react';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';
const { Arc, Html } = Guide;


const defaultColorScale = [
  { fill: '#0086FA', range: [0, 40] },
  { fill: '#FFBF00', range: [40, 70] },
  { fill: '#F5222D', range: [70, 100] },
];

interface IProps {
  value: number;
  min?: number;
  max?: number;
  tickInterval?: number;
  arcWidth?: number;
  colorScale?: Array<{
    fill: string;
    range: number[];
  }>;
  unit?: string;
  height?: number;
}

const Gauge = ({
  value,
  min = 0,
  max = 100,
  tickInterval = 10,
  arcWidth = 10,
  colorScale = defaultColorScale,
  unit = '',
  height = 250,
}: IProps) => {

  const cols = {
    value: {
      min,
      max,
      tickInterval,
      nice: false,
    },
  };

  return (
    <Chart height={height} data={[{ value }]} scale={cols} padding={[-50, 0, 0, 0]} forceFit>
      <Coord
        type="polar"
        startAngle={-9 / 8 * Math.PI}
        endAngle={1 / 8 * Math.PI}
        radius={0.75}
      />
      <Axis
        name="value"
        // @ts-ignore
        line={null}
        label={{
          offset: -16,
          textStyle: {
            fontSize: 16,
            textAlign: 'center',
            textBaseline: 'middle',
            fill: '#999',
          },
        }}
        subTickCount={4}
        subTickLine={{
          length: -8,
          stroke: '#fff',
          strokeOpacity: 1,
        }}
        tickLine={{
          length: -18,
          stroke: '#fff',
          strokeOpacity: 1,
        }}
      />
      <Axis name="1" visible={false} />
      <Guide>
      <Arc
        // @ts-ignore
        zIndex={0}
        start={[min, 0.965]}
        end={[max, 0.965]}
        style={{
          stroke: 'rgba(0, 0, 0, 0.09)',
          lineWidth: arcWidth,
        }}
      />
      {
        colorScale.map((scale, index) => (
          value >= scale.range[0] && <Arc
            key={index}
            // @ts-ignore
            zIndex={1}
            start={[scale.range[0], 0.965]}
            end={[value > scale.range[1] ? scale.range[1] : value, 0.965]}
            style={{
              stroke: scale.fill,
              lineWidth: arcWidth,
            }}
          />
        ))
      }
      <Html
        position={['52%', '91%']}
        html={`
          <div style="width: 300px;text-align: center;">
            <span style="font-size: 28px; color: rgba(0,0,0,0.85);margin: 0;font-weight: 400;">
              ${Math.round(value)}
            </span>
            <span>
              ${unit}
            </span>
          </div>
        `}
      />
      </Guide>
      <Geom
        type="point"
        position="value*1"
        shape="pointer"
        color="#1890FF"
        active={false}
        style={{ stroke: '#fff', lineWidth: 1 }}
      />
    </Chart>
  );
}


// @ts-ignore
Shape.registerShape('point', 'pointer', {
  // @ts-ignore
  drawShape(cfg, group) {
    let point = cfg.points[0];
    point = this.parsePoint(point);
    const center = this.parsePoint({
      x: 0,
      y: 0,
    });
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 12,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});

export default Gauge;
