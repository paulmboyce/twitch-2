import React from "react";
import AbstractModal from "./AbstractModal";
import "./Modal.css";

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showModal: false };

		this.handleShow = this.handleShow.bind(this);
		this.handleHide = this.handleHide.bind(this);
	}

	handleShow() {
		this.setState({ showModal: true });
	}

	handleHide() {
		this.setState({ showModal: false });
	}

	handleClickOk() {
		if (typeof this.props.onClickOk !== "function") {
			return console.log("No onClickOk() function configured.");
		}
		this.props.onClickOk();
	}

	handleClickCancel() {
		if (typeof this.props.onClickCancel !== "function") {
			console.log("No onClickCancel() prop. Using default behaviour.");
			this.handleHide();
			return;
		}
		this.props.onClickCancel();
	}

	render() {
		const { message, okLabel, cancelLabel } = this.props;

		// Show a Modal on click.
		// (In a real app, don't forget to use ARIA attributes
		// for accessibility!)
		const modal = this.state.showModal ? (
			<AbstractModal>
				<div className="modal" onClick={this.handleHide}>
					<div
						className="ui placeholder segment"
						style={{ minWidth: "50%", textAlign: "center" }}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<div className="ui  header">
							{message ? message : "Want to proceed?"}
						</div>
						<div className="inline">
							<br />
							<div
								className="ui button"
								onClick={(e) => {
									this.handleClickCancel(e);
								}}
							>
								{cancelLabel ? cancelLabel : "CANCEL"}
							</div>
							<div
								className="ui primary button"
								onClick={(e) => {
									this.handleClickOk(e);
								}}
							>
								{okLabel ? okLabel : "OK"}
							</div>
						</div>
					</div>
				</div>
			</AbstractModal>
		) : null;

		return (
			<div className="app">
				This div has overflow: hidden.
				<button onClick={this.handleShow}>Show modal</button>
				{modal}
			</div>
		);
	}
}

export default Modal;
