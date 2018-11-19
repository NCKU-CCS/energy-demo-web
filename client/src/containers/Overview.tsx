import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import memoize from "memoize-one";
import {
  Card,
  Row,
  Col,
  Select,
  Spin,
} from 'antd';

import LineChart from '../components/LineChart';
import Gauge from '../components/Gauge';
import Calendarhorizontal from '../components/Calendarhorizontal';
import utils from '../utils';

const Option = Select.Option;

interface IEgauge {
  dataid: string;
  powerUsage: number;
  waterUsage: number;
  gasUsage: number;
}


interface IProps {
  socket: SocketIOClient.Socket;
  egauges: IEgauge[];
  gaugeData: {
    powerUsage: number;
    waterUsage: number;
    gasUsage: number;
  };
  loading: boolean;
  refetch: (variables?: { dataid: string }) => Promise<any>;
}

interface IState {
  dataid: string;
  egaugesFromSocket: IEgauge[];
}

class Overview extends React.Component<IProps> {
  state: IState = {
    dataid: '0',
    egaugesFromSocket: [],
  };

  combine =  memoize(
    (egauges: IEgauge[], egaugesFromSocket: IEgauge[]) => egauges.concat(
      egaugesFromSocket.filter((e: any) => e.dataid === this.state.dataid, 
    ))
  );

  sum = memoize(
    (gaugeData: any, egaugesFromSocket: IEgauge[]) => utils.sumGaugeData(
      egaugesFromSocket
        .filter(e => e.dataid === this.state.dataid)
        .concat([gaugeData])
    )
  );

  componentDidMount() {
    this.props.socket.on('egaugeAdded', this.handleNewData);
  }

  componentWillUnmount() {
    this.props.socket.off('egaugeAdded', this.handleNewData);
  }

  handleNewData = (egaugesFromSocket: IEgauge[]) => {
    this.setState((state: IState) => ({
      egaugesFromSocket: state.egaugesFromSocket.concat(egaugesFromSocket),
    }));  
  }

  handleChange = (dataid: string) => {
    this.setState({
      dataid,
      egaugesFromSocket: [],
    });
    this.props.refetch({
      dataid,
    });
  }

  render() {
    if (this.props.loading) {
      return (<Spin />);  
    }
    const allEgauges = this.combine(this.props.egauges, this.state.egaugesFromSocket);
    const sumGaugeData = this.sum(this.props.gaugeData, this.state.egaugesFromSocket);
    console.log(this.state.egaugesFromSocket, sumGaugeData);
    return (
      <React.Fragment>
        <Select
          showSearch
          style={styles.select}
          placeholder="Select or Search a House ID"
          value={this.state.dataid}
          onChange={this.handleChange}
        >
          {/* FIX: Change to real house id */}
          { Array(800).fill(0).map((_, index) => (
              <Option key={`${index}`} value={`${index}`}>{index}</Option>
            ))
          }
        </Select>
        <Row gutter={16}>
          <Col md={8} xs={24}>
            <Card title="Energy Usuage">
              <Gauge value={sumGaugeData.powerUsage} unit="kWh" />
            </Card>
          </Col>
          <Col md={8} xs={24}>
            <Card title="Water Usuage">
              <Gauge value={sumGaugeData.waterUsage} unit="m3" />
            </Card>
          </Col>
          <Col md={8} xs={24}>
            <Card title="Gas Usuage">
              <Gauge value={sumGaugeData.gasUsage} unit="m3" />
            </Card>
          </Col>
        </Row>
        <Row>
          <LineChart
            data={allEgauges}
            yFields={['powerUsage', 'waterUsage', 'gasUsage']}
            xField="createdAt"
          />
        </Row>
        <Row>
          <Calendarhorizontal />
        </Row>
      </React.Fragment>
    );
  }
};

const styles = {
  select: {
    marginBottom: 10,
    width: 200,
    fontSize: 13,
  }
};

const query = gql`
query getEgauges($dataid: String! $filter: Filter){
  egauges: getEgauges(
    dataid: $dataid
    filter: $filter
  ) {
    powerUsage,
    waterUsage,
    gasUsage,
    createdAt
  }
}
`;

export default graphql(query, {
  props: ({ data: { loading, egauges, refetch } }: any) => ({
    loading,
    refetch,
    egauges,
    gaugeData: loading ? {} : utils.sumGaugeData(egauges),
  }),
  options: (props) => ({
    variables: {
      dataid: '0',
      filter: {
        // FIX: use today
        createdAt_gte: '2015/1/30',
      }
    },
  }),
})(Overview);
