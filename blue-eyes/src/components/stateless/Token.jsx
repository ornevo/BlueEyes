export default function Token({ color, children }) {
    return (
        <span className={"p-1 text-center mx-0.5 text-sm rounded-md inline text-white bg-" + color}>{children}</span>
    )
}