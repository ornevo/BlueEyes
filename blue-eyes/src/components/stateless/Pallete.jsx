/*
A dirty hack to overcome a weird color bug. it's ugly AF, no one cares
we need a pixel for each color we use for some reason
*/
const Pixel = ({color}) => <span className={
    "border-" + color + " bg-" + color + " text-" + color
}></span>

export default function() {
    return (
        <span>
            <span className="bg-red-500 text-red-500 border-red-500"></span>
            <span className="hover:bg-red-500 hover:text-red-500 hover:border-red-500"></span>

            <span className="bg-emerald-500 text-emerald-500 border-emerald-500"></span>
            <span className="hover:bg-emerald-500 hover:text-emerald-500 hover:border-emerald-500"></span>

            <span className="bg-orange-400 text-orange-400 border-orange-400"></span>
            <span className="hover:bg-orange-400 hover:text-orange-400 hover:border-orange-400"></span>

            <span className="bg-sky-700 text-sky-700 border-sky-700"></span>
            <span className="bg-white text-white border-white"></span>
        </span>
    )
}