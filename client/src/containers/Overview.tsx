import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import memoize from 'memoize-one';
import {
  Card,
  Row,
  Col,
  Select,
  Spin,
  Form,
} from 'antd';

import LineChart from '../components/LineChart';
import Gauge from '../components/Gauge';
import Calendarhorizontal from '../components/Calendarhorizontal';
import utils from '../utils';

const FormItem = Form.Item;
const Option = Select.Option;

const houseIDList = ['TS_1_1_1', 'TS_1_1_10', 'TS_1_1_11', 'TS_1_1_12', 'TS_1_1_13', 'TS_1_1_14', 'TS_1_1_15', 'TS_1_1_16', 'TS_1_1_2', 'TS_1_1_3', 'TS_1_1_4', 'TS_1_1_5', 'TS_1_1_6', 'TS_1_1_7', 'TS_1_1_8', 'TS_1_1_9', 'TS_1_2_1', 'TS_1_2_2', 'TS_1_2_3', 'TS_1_2_4', 'TS_1_2_5', 'TS_1_2_6', 'TS_1_2_7', 'TS_1_2_8', 'TS_1_3_1', 'TS_1_3_10', 'TS_1_3_11', 'TS_1_3_12', 'TS_1_3_13', 'TS_1_3_14', 'TS_1_3_15', 'TS_1_3_16', 'TS_1_3_17', 'TS_1_3_18', 'TS_1_3_2', 'TS_1_3_3', 'TS_1_3_4', 'TS_1_3_5', 'TS_1_3_6', 'TS_1_3_7', 'TS_1_3_8', 'TS_1_3_9', 'TS_1_4_1', 'TS_1_4_2', 'TS_1_4_3', 'TS_1_4_4', 'TS_1_4_5', 'TS_1_4_6', 'TS_1_4_7', 'TS_1_4_8', 'TS_1_5_1', 'TS_1_5_2', 'TS_1_5_3', 'TS_1_5_4', 'TS_1_6_1', 'TS_1_6_2', 'TS_1_6_3', 'TS_1_6_4', 'TS_1_6_5', 'TS_1_6_6', 'TS_1_6_7', 'TS_1_6_8', 'TS_1_6_9', 'TS_1_7_1', 'TS_1_7_10', 'TS_1_7_2', 'TS_1_7_3', 'TS_1_7_4', 'TS_1_7_5', 'TS_1_7_6', 'TS_1_7_7', 'TS_1_7_8', 'TS_1_7_9', 'TS_1_8_1', 'TS_1_8_2', 'TS_1_8_3', 'TS_1_9_1', 'TS_1_9_2', 'TS_1_9_3', 'TS_1_9_4']

interface IHouseState {
  houseID: string;
  powerUsage: number;
  waterUsage: number;
  gasUsage: number;
}

interface IProps {
  socket: SocketIOClient.Socket;
  houseStates: IHouseState[];
  loading: boolean;
  refetch: (variables?: { houseID: string }) => Promise<any>;
}

interface IState {
  houseID: string;
  houseStatesFromSocket: IHouseState[];
}

class Overview extends React.Component<IProps> {
  state: IState = {
    houseID: 'TS_1_1_1',
    houseStatesFromSocket: [],
  };

  filter = memoize(
    (houseStatesFromSocket: IHouseState[]) => (
      houseStatesFromSocket.filter(e => e.houseID === this.state.houseID)
    )
  );

  combine =  memoize(
    (houseStates: IHouseState[], filteredHouseStatesFromSocket: IHouseState[]) => (
      houseStates.concat(filteredHouseStatesFromSocket)
    )
  );

  sum = memoize(
    (houseStates: IHouseState[], filteredHouseStatesFromSocket: IHouseState[]) => (
      utils.sumGaugeData(
        filteredHouseStatesFromSocket.concat(houseStates)
      )
    )
  );

  componentDidMount() {
    this.props.socket.on('houseStateAdded', this.handleNewData);
  }

  componentWillUnmount() {
    this.props.socket.off('houseStateAdded', this.handleNewData);
  }

  handleNewData = (houseStatesFromSocket: IHouseState[]) => {
    this.setState((state: IState) => ({
      houseStatesFromSocket: state.houseStatesFromSocket.concat(houseStatesFromSocket),
    }));  
  }

  handleChange = (houseID: string) => {
    this.setState({
      houseID,
      houseStatesFromSocket: [],
    });
    this.props.refetch({
      houseID,
    });
  }

  render() {
    if (this.props.loading) {
      return (<Spin />);  
    }
    const filteredHouseStatesFromSocket = this.filter(this.state.houseStatesFromSocket);
    const allHouseStates = this.combine(this.props.houseStates, filteredHouseStatesFromSocket);
    const sumGaugeData = this.sum(this.props.houseStates, filteredHouseStatesFromSocket);
    return (
      <React.Fragment>
        <FormItem
          label="House ID"
        >
          <Select
            showSearch
            style={styles.select}
            placeholder="Select or Search a House ID"
            value={this.state.houseID}
            onChange={this.handleChange}
          >
            {/* FIX: Change to real house id */}
            { houseIDList.map((id) => (
                <Option key={`${id}`} value={`${id}`}>{id}</Option>
              ))
            }
          </Select>
        </FormItem>
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
            data={allHouseStates}
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
query getHouseStates($houseID: String! $filter: Filter){
  houseStates: getHouseStates(
    houseID: $houseID
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
  props: ({ data: { loading, houseStates, refetch } }: any) => ({
    loading,
    refetch,
    houseStates,
  }),
  options: (props) => ({
    variables: {
      houseID: 'TS_1_1_1',
      filter: {
        // FIX: use today
        createdAt_gte: '2015/1/30',
      }
    },
  }),
})(Overview);
