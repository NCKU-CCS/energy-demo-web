import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
// @ts-ignore: no type
import DataSet from "@antv/data-set";

interface IProps {
  data: any;
  yFields: string[];
  xField: string;
  tickCount?: number;
  height?: number;
}
const OverviewLineChart = ({
  data,
  yFields,
  xField,
  tickCount = 12,
  height = 400,
}: IProps) => {
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: 'fold',
    fields: yFields,
    key: 'type',
    value: 'value',
  });
  const cols = {
    [xField]: {
      range: [0, 1],
      tickCount,
    }
  };

  return (
    <Chart
      style={styles.chart}
      height={height}
      padding={[50, 50, 80, 50]}
      data={dv}
      scale={cols}
      forceFit
    >
      <Legend
        itemFormatter={(item) => {
          const d = {
            powerUsage: 'Usuage',
            waterUsage: 'Generation',
            grid: 'Grid'
          }
          return d[item];
        }}
      />
      <Axis
        name="value"
        label={{
          formatter: val => `${val}`
        }}
        grid={{
          lineStyle: {
            lineWidth: 0,
          }
        }}
      />
      <Axis
        name={xField}
        label={{
          formatter: val => val.split(' ')[1]
        }}
        grid={{
          lineStyle: {
            lineWidth: 0,
          }
        }}
      />
      <Tooltip
        crosshairs={{
          type: "y"
        }}
      />
      <Geom
        type="line"
        position={`${xField}*value`}
        size={2}
        color={'type'}
      />
    </Chart>
  );
};

const styles = {
  chart: {
    background: '#fff', margin: '15px 0'
  },
};

export default OverviewLineChart;

