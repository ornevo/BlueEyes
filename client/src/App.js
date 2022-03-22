import { Component } from 'react';
import './App.css';
import Menu from "./components/stateless/Menu"; 
import Pallete from "./components/stateless/Pallete"; 
import Constants from "./constants";
import NotificationsBody from "./components/stateful/NotificationsBody";
import WordsBody from "./components/stateful/WordsBody";
import axios from 'axios';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    // this.client = new W3CWebSocket('ws://127.0.0.1:5000/');

    this.state = {
      page: Constants.PAGE_NOTF,
      popupOpen: false,
      newNotificationId: undefined,
      words: [],
      notifications: [],
      isLoading: true
    }
  }

  componentWillMount() {
    setInterval(this.fetchDataFromServer.bind(this), 1500);
  }

  updateWords(newWords, callback) {
    axios.post('http://localhost:5000/update-words', newWords)
      .then(resp => {
        this.setState({words: resp.data});
        if(callback) callback();
      })
      .catch(error => console.log(error));
  }

  onPageSwitch(newPage) {
    this.setState({page: newPage});
  }

  addNewWord() {
    return axios.post('http://localhost:5000/new-word')
      .then(resp => this.setState({words: resp.data}))
      .catch(error => console.log(error));
  }

  fetchDataFromServer() {
    return axios.get('http://localhost:5000/state')
      .then(this.onNewStateFromServer.bind(this))
      .catch(error => console.log(error));
  }

  /*
   * This is called when the server returns a new state (words and notification).
   * it is in format of {words: [...], notifications: [...]}
   */
  onNewStateFromServer(newState) {
    newState = newState.data;

    if(this.state.isLoading) {
      newState.isLoading = false;
      this.setState(newState);
    } else {
      // Check for new notification
      if(newState.notifications.length > this.state.notifications.length) {
        this.alertNewNotif(
          newState.notifications.filter(n => this.state.notifications.find(n2 => n2.id === n.id) === undefined)[0]
        )
      }

      this.setState(newState);
    }
  }

  showNotif(notId) {
    this.setState({
      newNotificationId: notId,
      page: Constants.PAGE_NOTF
    });
  }

  alertNewNotif(notif) {
    const words = notif.words.map(wid => this.state.words.find(w => w.id === wid).word);
    const msg = 'התראה על המיל' + (words.length === 1 ? "ה" : "ים") + " " + words.join(", ");
    toast.info(msg, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      onClick: () => this.showNotif(notif.id),
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  dismissNotif(notifId) {
    axios.post('http://localhost:5000/dismiss-notification', {id: notifId})
    .then(resp => {
      this.setState({
        newNotificationId: undefined
      }, () => this.onNewStateFromServer({
        notifications: resp.data,
        words: this.state.words
      }))
    })
    .catch(error => console.log(error));
  }

  setPopupOpen(newVal) {
    console.log('popupopen', newVal);
    this.setState({popupOpen: newVal});
  }

  showNotif() {
    axios.get('http://localhost:5000/show-notif')
  }

  render() {
    return (
      <div className="App">
        <Pallete/>
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />

        {/* Actual content */}
        <Menu page={this.state.page} onPageSwitch={this.onPageSwitch.bind(this)} blur={(this.state.popupOpen)} onMenuClick={this.showNotif.bind(this)}/>
        {
          this.state.page == Constants.PAGE_NOTF ? 
          <NotificationsBody autoOpenNotif={this.state.newNotificationId} setPopupOpen={this.setPopupOpen.bind(this)} markNotificationAsRead={this.dismissNotif.bind(this)} words={this.state.words} notifications={this.state.notifications}/> :
          <WordsBody updateWords={this.updateWords.bind(this)} addNewWord={this.addNewWord.bind(this)} words={this.state.words} />
        }
      </div>
    );
  }
}

export default App;
