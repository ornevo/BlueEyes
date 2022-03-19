import { XIcon } from '@heroicons/react/solid'


export default function Popup({onClose, children}) {
    return (
        <div className="fixed w-full h-full top-0 left-0 z-40" onClick={onClose}>
            <div className="fixed w-5/6	h-5/6 top-[8%] left-[8%] bg-white z-50 rounded-lg p-6 border-gray-500 shadow-lg">
                <XIcon onClick={onClose} className="h-6 cursor-pointer mx-1 w-6 mb-4"/>
                {children}
            </div>
        </div>

    )
}