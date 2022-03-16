const IconedText = ({icon, children, color}) => {
    const IconElem = icon;
    return (
        <span>
            <IconElem className={"h-6 mx-1 w-6 inline text-" + color}/>
            {children}
        </span>
    )
}


export default IconedText;