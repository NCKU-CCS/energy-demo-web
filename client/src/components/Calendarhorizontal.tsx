import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Shape,
  Util
} from 'bizcharts';

import calendar from '../utils/calendar';

const cols = {
  value: {
    sync: true,
    formatter: (v: number) => (`${v.toFixed(2)}`)
  },
  day: {
    type: 'cat',
    values: [
      'SUN',
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT',
    ]
  },
  week: {
    type: 'cat'
  },
};

const Calendarhorizontal = () => {
  return (
    <Chart
      style={{ background: '#fff' }}
      height={300}
      data={calendar.data}
      scale={cols}
      padding={[50, 40, 50, 80]}
      forceFit
    >{/* 
    // @ts-ignore */}
      <Tooltip title="date" />
      <Axis
        name="week"
        position="top"
        // @ts-ignore
        tickLine={null}
        // @ts-ignore
        line={null}
        label={{
          offset: 12,
          textStyle: {
            fontSize: 12,
            fill: "#666",
            textBaseline: "top"
          },
          formatter: (val) => (calendar.weekToMonth[val])
        }}
      />
      <Axis
        name="day" 
        // @ts-ignore
        grid={null}
      />
      <Geom
        type="polygon"
        position="week*day*date"
        shape="boundary-polygon"
        color={["value", "#BAE7FF-#1890FF-#0050B3"]}
      />
      <Coord reflect="y" />
    </Chart>
  );
}

// @ts-ignore
Shape.registerShape("polygon", "boundary-polygon", {
  // @ts-ignore
  draw(cfg, container) {
    if (!Util.isEmpty(cfg.points)) {
      const attrs = {
        stroke: "#fff",
        lineWidth: 1,
        fill: cfg.color,
        fillOpacity: cfg.opacity
      };
      const points = cfg.points;
      const path = [
        ["M", points[0].x, points[0].y],
        ["L", points[1].x, points[1].y],
        ["L", points[2].x, points[2].y],
        ["L", points[3].x, points[3].y],
        ["Z"]
      ];
      // @ts-ignore
      attrs.path = this.parsePath(path);
      const polygon = container.addShape("path", {
        attrs
      });

      if (cfg.origin._origin.lastWeek) {
        const linePath = [
          ["M", points[2].x, points[2].y],
          ["L", points[3].x, points[3].y]
        ];

        container.addShape("path", {
          zIndex: 1,
          attrs: {
            // @ts-ignore
            path: this.parsePath(linePath),
            lineWidth: 1,
            stroke: "#404040"
          }
        });

        if (cfg.origin._origin.lastDay) {
          container.addShape("path", {
            zIndex: 1,
            attrs: {
              // @ts-ignore
              path: this.parsePath([
                ["M", points[1].x, points[1].y],
                ["L", points[2].x, points[2].y]
              ]),
              lineWidth: 1,
              stroke: "#404040"
            }
          });
        }
      }

      container.sort();
      return polygon;
    }
  }
});

export default Calendarhorizontal;
