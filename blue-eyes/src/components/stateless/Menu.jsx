import Constants  from '../../constants';

export default function Menu(props) {
    return (
        <menu className="menu-container">
            <div className="menu-item">LOGO</div>
            <div className={"menu-item" + (props.page == Constants.PAGE_NOTF ? " menu-item-active" : "")}>התראות</div>
            <div className={"menu-item" + (props.page == Constants.PAGE_WORDS ? " menu-item-active" : "")}>מילים אינדקטיביות</div>
        </menu>
    );
}