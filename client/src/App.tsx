import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import io from 'socket.io-client';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Overview from './containers/Overview';
import HeatMap from './containers/Heatmap';
import Map from './containers/Map';
import Map3D from './containers/Map3D';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

const { Content } = Layout;

const client = new ApolloClient({ uri: process.env.REACT_APP_GRAPH_QL_URI});
const socket = io(String(process.env.REACT_APP_SOCKET_ENDPOINT));

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Layout style={styles.container}>
            <Sidebar collapsed />
            <Layout>
              <Header title="Next Generation Energy Demo" />
              <Content style={styles.content}>
                <Route
                  exact
                  path="/"
                  // @ts-ignore: HOC socket prop not work
                  render={(props) => <Overview {...props} socket={socket} />}
                />
                <Route path="/map/" component={Map} />
                <Route path="/map3d/" component={Map3D} />
                <Route path="/heatmap/" component={HeatMap} />
              </Content>
            </Layout>
          </Layout>
        </Router>
      </ApolloProvider>
    );
  }
}

const styles = {
  container: {
    height: '100%',
  },
  content: {
    margin: '20px 16px',
    padding: '0 20px',
    minHeight: 280,
    overflow: 'initial',
  },
}

export default App;
