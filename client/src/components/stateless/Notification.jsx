import Constants from "../../constants";
import { ClockIcon, WifiIcon, CalendarIcon, LocationMarkerIcon, CheckCircleIcon, EyeIcon } from '@heroicons/react/solid'
import IconedText from "./IconedText";
import WordTokenList from "./WordTokenList";

export default function Notification(props) {
    const sever = props.data.severity;
    const color = Constants.SEVERITY_TO_COLOR[sever];
    
    const actionColor = color;
    return (
        <div className="notification-cont rounded-md bg-white p-1 drop-shadow select-none">
            <div className={"rounded-t-md bg-white p-3 border-" + color + " border-2 border-b-0 "}>
                {/* words */}
                <WordTokenList wordIds={props.data.words} words={props.words} />

                {/* data */}
                <div className="grid grid-cols-2 justify-center gap-1 grid-rows-2">
                    <IconedText icon={ClockIcon} color={color}>{props.data.time}</IconedText>
                    <IconedText icon={WifiIcon} color={color}>{props.data.freq}</IconedText>
                    <IconedText icon={CalendarIcon} color={color}>{props.data.date}</IconedText>
                    <IconedText icon={LocationMarkerIcon} color={color}>{props.data.location}</IconedText>
                </div>
            </div>
            {/* Action buttons */}
            <div className="grid grid-cols-2 cursor-pointer">
                <div onClick={() => props.markNotificationAsRead(props.data.id)}
                     className={"border-" + actionColor + " border-2 hover:bg-" + color + " text-" + color + " hover:text-white text-center border-l-0 rounded-br-md p-3"}>
                    <IconedText icon={CheckCircleIcon}></IconedText>
                </div>
                <div onClick={() => props.onView(props.data.id)}   
                     className={"border-" + actionColor + " border-2 hover:bg-" + color + " text-" + color + " hover:text-white text-center rounded-bl-md p-3"}>
                    <IconedText icon={EyeIcon} ></IconedText>
                </div>
            </div>
        </div>
    )
} 