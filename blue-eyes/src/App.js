import { Component } from 'react';
import './App.css';
import Menu from "./components/stateless/Menu"; 
import Constants from "./constants";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: Constants.PAGE_NOTF,
      notifications: [
        {
          severity: Constants.SEVERITY_HIGH,
          words: ["הטעיה", "תירס חם"],
          freq: 52.5,
          time: "11:24"
        },
        {
          severity: Constants.SEVERITY_MID,
          words: ["מנהרה"],
          freq: 52.5,
          time: "13:51"
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Menu page={this.state.page}/>
      </div>
    );
  }
}

export default App;
