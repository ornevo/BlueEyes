import Constants from "../../constants";
import Token from "./Token";
import { ClockIcon, WifiIcon, CalendarIcon, LocationMarkerIcon, CheckCircleIcon, EyeIcon } from '@heroicons/react/solid'


const IconedText = ({icon, children, color}) => {
    const IconElem = icon;
    return (
        <span>
            <IconElem className={"h-6 mx-1 w-6 inline text-" + color}/>
            {children}
        </span>
    )
}


export default function Notification(props) {
    const sever = props.data.severity;
    const color = sever === Constants.SEVERITY_HIGH ? "red-500" :
                    sever === Constants.SEVERITY_MID ? "orange-400" : "emerald-500";
    const actionColor = color;
    return (
        <div className="notification-cont rounded-md bg-white p-1 drop-shadow">
            <div className={"rounded-t-md bg-white p-3 border-" + color + " border-2 border-b-0 "}>
                {/* words */}
                <div className="gap-1 mb-3">
                    {props.data.words.map(word => <Token color={color}>{word}</Token>)}
                </div>
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
                <div className={"border-" + actionColor + " border-2 hover:bg-" + color + " text-" + color + " hover:text-white text-center border-l-0 rounded-br-md p-3"}>
                    <IconedText icon={CheckCircleIcon}></IconedText>
                </div>
                <div className={"border-" + actionColor + " border-2 hover:bg-" + color + " text-" + color + " hover:text-white text-center rounded-bl-md p-3"}>
                    <IconedText icon={EyeIcon} ></IconedText>
                </div>
            </div>
        </div>
    )
} 