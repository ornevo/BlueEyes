import { Component } from 'react';
import Notification from "../stateless/Notification";
import NotificationPopupContent from "../stateless/NotificationPopupContent";
import Popup from "../stateless/Popup";
import { wrapGrid } from 'animate-css-grid'
import 'react-h5-audio-player/lib/styles.css';


class NotificationsBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewedNotId: undefined
        };
    }

    onView(notId) {
        this.setState({viewedNotId: notId}, () => this.props.setPopupOpen(true));
    }

    onViewClose() {
        this.setState({viewedNotId: undefined}, () => this.props.setPopupOpen(false));
    }

    autoOpenNotifIfNeeded(previousProps) {
        // Check for auto focus on notification when clicking on notification alert
        if(this.props.autoOpenNotif && this.props.autoOpenNotif !== previousProps.autoOpenNotif)
            this.onView(this.props.autoOpenNotif);
    }

    componentDidMount() {
        this.autoOpenNotifIfNeeded({})
        
        const grid = document.getElementById("notifGrid");
        wrapGrid(grid);
        console.log('Wrapped!');
    }

    componentDidUpdate(previousProps) {
        this.autoOpenNotifIfNeeded(previousProps)
    }

    render() {
        const viewedNot = this.state.viewedNotId &&
                            this.props.notifications.find(n => n.id === this.state.viewedNotId);
        return (
            <div>
                {
                    viewedNot && (
                        <Popup onClose={this.onViewClose.bind(this)} >
                            <NotificationPopupContent words={this.props.words} notification={viewedNot} />
                        </Popup>
                    )
                }

                <div id="notifGrid" className={"grid grid-cols-4 gap-8 p-5 " + (this.state.viewedNotId !== undefined && " blur")}>
                    {/* TODO: filtering, sorting, etc... */}
                    {this.props.notifications.map(not => (
                        <Notification data={not} markNotificationAsRead={this.props.markNotificationAsRead}
                                    words={this.props.words} key={not.id} onView={this.onView.bind(this)}/>
                    ))}
                </div>
            </div>
        );
    }
}


export default NotificationsBody;