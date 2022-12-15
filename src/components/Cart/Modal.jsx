import classes from "./Modal.module.css";
import ReactDom from 'react-dom';
import React from 'react';

const portalElement = document.getElementById('overlays');


class Backdrop extends React.Component {
    render() {
        return <div onClick={this.props.onClose} className={classes.backdrop}/>
    }
}

class ModalOverlay extends React.Component {
    render() {
        return <div>
            <div className={classes.modal}>{this.props.children}</div>
        </div>
    }
}

export class Modal extends React.Component {

    render() {
        return (
            <div>
                {ReactDom.createPortal(<Backdrop onClose={this.props.onClose}/>, portalElement)}
                {ReactDom.createPortal(<ModalOverlay>{this.props.children}</ModalOverlay>, portalElement)}
            </div>
        )
    }
}