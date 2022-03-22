import Constants  from '../../constants';

export default function Menu({onPageSwitch, page, blur}) {
    return (
        <menu className={"menu-container select-none" + (blur && " blur")}>
            <div className="menu-item">LOGO</div>
            <div 
                className={"cursor-pointer menu-item" + (page == Constants.PAGE_NOTF ? " menu-item-active" : "")}
                onClick={_ => onPageSwitch(Constants.PAGE_NOTF)}
            >
                התראות
            </div>
            <div 
                className={"cursor-pointer menu-item" + (page == Constants.PAGE_WORDS ? " menu-item-active" : "")}
                onClick={_ => onPageSwitch(Constants.PAGE_WORDS)}
            >
                מילים אינדקטיביות
            </div>
        </menu>
    );
}