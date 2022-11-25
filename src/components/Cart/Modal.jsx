import classes from "./Modal.module.css";
import ReactDom from 'react-dom';

function Backdrop(props) {
    return <div onClick={props.onClose} className={classes.backdrop}/>
}

function ModalOverlay(props) {
    return <div>
        <div className={classes.modal}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');

export function Modal(props) {
    return (
        <div>
            {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </div>
    )
}