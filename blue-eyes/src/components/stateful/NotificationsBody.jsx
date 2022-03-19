import { Component } from 'react';
import Notification from "../stateless/Notification";


class NotificationsBody extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="grid grid-cols-4 gap-8 p-5">
                {/* TODO: filtering, sorting, etc... */}
                {this.props.notifications.map(not => (
                    <Notification data={not} markNotificationAsRead={this.props.markNotificationAsRead}
                                  words={this.props.words} key={not.id}/>
                ))}
            </div>
        );
    }
}


export default NotificationsBody;