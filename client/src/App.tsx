import * as React from 'react';
import io from 'socket.io-client';

const socketURI = 'http://localhost:3000';

interface IState {
  egauge?: {
    dataid: string;
    use: number;
    gen: number;
    grid: number;
    createdAt: string;
  }
}

class App extends React.Component {
  state: IState = {};

  componentDidMount() {
    const socket = io(socketURI);
    socket.on('egaugeAdded', (egauge: any) => this.setState({ egauge }));
  }

  render() {
    // tslint:disable
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DEMO</h1>
        </header>
        <p>
          Egauge Data: { JSON.stringify(this.state.egauge) }
        </p>
      </div>
    );
  }
}

export default App;
