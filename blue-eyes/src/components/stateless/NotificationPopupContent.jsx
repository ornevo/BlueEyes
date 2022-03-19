import IconedText from "../stateless/IconedText";
import WordTokenList from "../stateless/WordTokenList";
import { ClockIcon, WifiIcon, CalendarIcon, LocationMarkerIcon, CheckCircleIcon, EyeIcon } from '@heroicons/react/solid'
import AudioPlayer from 'react-h5-audio-player';


export default function NotificationPopupContent({words, notification}) {
    return (
        <div className="">
            {/* Metadate */}
            <span className="text-center">
                <WordTokenList wordIds={notification.words} words={words} />

                <div className="grid gap-2 grid-cols-[1fr_auto_auto_auto_auto_1fr]">
                    <span></span>
                    <IconedText icon={ClockIcon} color={''}>{notification.time}</IconedText>
                    <IconedText icon={WifiIcon} color={''}>{notification.freq}</IconedText>
                    <IconedText icon={CalendarIcon} color={''}>{notification.date}</IconedText>
                    <IconedText icon={LocationMarkerIcon} color={''}>{notification.location}</IconedText>
                </div>
            </span>

            {/* The STT text */}
            <div className="my-4">
                <h3 className="text-gray-700 text-lg">תמלול השיחה</h3>
                <div className="border-gray-400 border-2 p-4 rounded">
                    {notification.text.split("\n").map(t => (
                        <span>{t}<br/></span>
                    ))}
                </div>
            </div>

            {/* Audio player */}
            <span style={{direction: "ltr"}}>
                <AudioPlayer
                    customAdditionalControls={[]}
                    src={notification.audio}
                />
            </span>
        </div>

    )
}