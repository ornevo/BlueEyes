import Constants from "../../constants";


export default function Notification(props) {
    const sever = props.data.severity;
    const color = sever === Constants.SEVERITY_HIGH ? "red-500" :
                    sever === Constants.SEVERITY_MID ? "orange-400" : "emerald-500";
    return (
        <div className="notification-cont rounded-md p-1 bg-white drop-shadow">
            <div className={"rounded-md p-3 bg-white border-" + color + " border-2"}>
            check

            </div>
        </div>
    )
} 