import { Component } from 'react';
import Notification from "../stateless/Notification";
import Popup from "../stateless/Popup";


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

    render() {
        return (
            <div>
                {
                    this.state.viewedNotId && (
                        <Popup onClose={this.onViewClose.bind(this)} >
                            check
                        </Popup>
                    )
                }

                <div className={"grid grid-cols-4 gap-8 p-5 " + (this.state.viewedNotId !== undefined && " blur")}>
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