import React from "react";
import AbstractModal from "./AbstractModal";
import "./Modal.css";

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showModal: props.show === false ? false : true };
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
		const { title, okLabel, cancelLabel } = this.props;

		// Show a Modal on click.
		// (In a real app, don't forget to use ARIA attributes
		// for accessibility!)
		const modal = this.state.showModal ? (
			<AbstractModal>
				<div
					data-testid="id-modal-container"
					className="modal"
					onClick={() => {
						this.handleClickCancel();
					}}
				>
					<div
						data-testid="id-modal-centre"
						className="ui placeholder segment"
						style={{ minWidth: "50%", textAlign: "center" }}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<div className="ui header">
							{title ? title : "Want to proceed?"}
						</div>
						<div className="inline">
							<br />
							<div
								role="button"
								className="ui button"
								onClick={(e) => {
									this.handleClickCancel(e);
								}}
							>
								{cancelLabel ? cancelLabel : "CANCEL"}
							</div>
							<div
								role="button"
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

		return <div>{modal}</div>;
	}
}

export default Modal;
