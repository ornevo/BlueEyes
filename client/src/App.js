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
      popupOpen: false,
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
          words: ["aaaa", "aaab"],
          freq: 52.5,
          time: "11:24",
          date: '1.2.2020',
          location: "מוצב חרמון",
          id: "abhcdbiabsbds",
          audio: 'http://www.hochmuth.com/mp3/Tchaikovsky_Nocturne__orch.mp3',
          text: 'יוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\nיוסי המניאק\n'
        },
        {
          severity: Constants.SEVERITY_LOW,
          words: ["aaac"],
          freq: 52.5,
          time: "15:32",
          date: '28.1.2020',
          location: "חטמ\"ר שומרון",
          id: "abhcdbiaasjd4",
          audio: 'http://www.hochmuth.com/mp3/Tchaikovsky_Nocturne__orch.mp3',
          text: 'placeholder'
        },
        {
          severity: Constants.SEVERITY_MID,
          words: ["aaad"],
          freq: 52.5,
          time: "13:51",
          date: '1.2.2020',
          location: "מרחב דרום",
          id: "abhcdbiaasjds",
          audio: 'http://www.hochmuth.com/mp3/Tchaikovsky_Nocturne__orch.mp3',
          text: 'placeholder'
        }
      ]
    }
  }

  onPageSwitch(newPage) { this.setState({page: newPage}); }

  addNewWord() {
    let newWord = {
      id: "random-id-placeholder-" + Math.floor(Math.random() * 10000),
      word: "",
      severity: Constants.SEVERITY_LOW
    };

    this.setState({words: [newWord, ...this.state.words]});
  }

  updateWords(newWords, callback) {
    this.setState({words: newWords}, callback ? callback() : undefined);
  }

  dismissNotif(notifId) {
    this.setState({notifications: this.state.notifications.filter(n => n.id !== notifId)});
  }

  setPopupOpen(newVal) { this.setState({popupOpen: newVal}); }

  render() {
    return (
      <div className="App">
        <Pallete/>
        <Menu page={this.state.page} onPageSwitch={this.onPageSwitch.bind(this)} blur={(this.state.popupOpen)}/>
        {
          this.state.page == Constants.PAGE_NOTF ? 
          <NotificationsBody setPopupOpen={this.setPopupOpen.bind(this)} markNotificationAsRead={this.dismissNotif.bind(this)} words={this.state.words} notifications={this.state.notifications}/> :
          <WordsBody updateWords={this.updateWords.bind(this)} addNewWord={this.addNewWord.bind(this)} words={this.state.words} />
        }
      </div>
    );
  }
}

export default App;