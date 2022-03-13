import { Component } from 'react';
import './App.css';
import Menu from "./components/stateless/Menu"; 
import Constants from "./constants";
import NotificationsBody from "./components/stateful/NotificationsBody";

class App extends Component {
  constructor(props) {
    super(props);
    /*
      filter by:
        freq
        area (north / south)
        severity
        words

      sort by time & severity
    */
    this.state = {
      page: Constants.PAGE_NOTF,
      notifications: [
        {
          severity: Constants.SEVERITY_HIGH,
          words: ["הטעיה", "תירס חם"],
          freq: 52.5,
          time: "11:24",
          date: '1.2.2020'
        },
        {
          severity: Constants.SEVERITY_MID,
          words: ["מנהרה"],
          freq: 52.5,
          time: "13:51",
          date: '1.2.2020'
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Menu page={this.state.page}/>
        {
          this.state.page == Constants.PAGE_NOTF ? 
          <NotificationsBody notifications={this.state.notifications}/> :
          "Not implemented"
        }
      </div>
    );
  }
}

export default App;
