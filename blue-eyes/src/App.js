import { Component } from 'react';
import './App.css';
import Menu from "./components/stateless/Menu"; 
import Pallete from "./components/stateless/Pallete"; 
import Constants from "./constants";
import NotificationsBody from "./components/stateful/NotificationsBody";
import WordsBody from "./components/stateful/WordsBody";

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
      words: [
        {
          id: "aaaa",
          word: "תירס חם",
          severity: Constants.SEVERITY_MID
        },
        {
          id: "aaab",
          word: "הטעיה",
          severity: Constants.SEVERITY_HIGH
        },
        {
          id: "aaac",
          word: "שקר כלשהוא",
          severity: Constants.SEVERITY_LOW
        },
        {
          id: "aaad",
          word: "מנהרה",
          severity: Constants.SEVERITY_MID
        },
      ],
      notifications: [
        {
          severity: Constants.SEVERITY_HIGH,
          words: ["הטעיה", "תירס חם"],
          freq: 52.5,
          time: "11:24",
          date: '1.2.2020',
          location: "מוצב חרמון",
          id: "abhcdbiabsbds"
        },
        {
          severity: Constants.SEVERITY_LOW,
          words: ["שקר כלשהוא"],
          freq: 52.5,
          time: "15:32",
          date: '28.1.2020',
          location: "חטמ\"ר שומרון",
          id: "abhcdbiaasjd4"
        },
        {
          severity: Constants.SEVERITY_MID,
          words: ["מנהרה"],
          freq: 52.5,
          time: "13:51",
          date: '1.2.2020',
          location: "מרחב דרום",
          id: "abhcdbiaasjds"
        }
      ]
    }
  }

  onPageSwitch(newPage) { this.setState({page: newPage}); }

  render() {
    return (
      <div className="App">
        <Pallete/>
        <Menu page={this.state.page} onPageSwitch={this.onPageSwitch.bind(this)}/>
        {
          this.state.page == Constants.PAGE_NOTF ? 
          <NotificationsBody notifications={this.state.notifications}/> :
          <WordsBody words={this.state.words} />
        }
      </div>
    );
  }
}

export default App;
