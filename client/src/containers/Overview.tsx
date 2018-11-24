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
import { HOUSE_ID_LIST } from '../constants';

const FormItem = Form.Item;
const Option = Select.Option;

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
            { HOUSE_ID_LIST.map((id) => (
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
