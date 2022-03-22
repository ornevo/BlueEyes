import Constants  from '../../constants';
import logo from "../../logo.png";

export default function Menu({onPageSwitch, page, blur, onMenuClick}) {
    return (
        <menu className={"menu-container select-none" + (blur && " blur")}>
            <div className="menu-item" onClick={onMenuClick}><img src={logo} className="h-6 w-10 mt-1"/></div>
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