import Constants  from '../../constants';

export default function Menu({onPageSwitch, page}) {
    return (
        <menu className="menu-container select-none">
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