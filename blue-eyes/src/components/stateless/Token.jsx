export default function Token({ color, children, customStyles }) {
    return (
        <span className={"p-1 text-center mx-0.5 text-sm rounded-md inline text-white bg-" + color + " " + customStyles}>
            {children}
        </span>
    )
}