import React, { useState } from "react";
import AbstractModal from "./AbstractModal";
import "./Modal.css";

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
const Modal = ({ onClickOk, onClickCancel, title, okLabel, cancelLabel }) => {
	const [showModal, setShowModal] = useState(true);

	function handleHide() {
		setShowModal(false);
	}

	function handleClickOk() {
		if (typeof onClickOk !== "function") {
			return console.log("No onClickOk() function configured.");
		}
		onClickOk();
	}

	function handleClickCancel() {
		if (typeof onClickCancel !== "function") {
			handleHide();
			return;
		}
		onClickCancel();
	}

	function renderModal() {
		return (
			<AbstractModal>
				<div
					data-testid="id-modal-container"
					className="modal"
					onClick={() => {
						handleClickCancel();
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
									handleClickCancel(e);
								}}
							>
								{cancelLabel ? cancelLabel : "CANCEL"}
							</div>
							<div
								role="button"
								className="ui primary button"
								onClick={(e) => {
									handleClickOk(e);
								}}
							>
								{okLabel ? okLabel : "OK"}
							</div>
						</div>
					</div>
				</div>
			</AbstractModal>
		);
	}

	const modal = showModal ? renderModal() : null;
	return <div>{modal}</div>;
};

export default Modal;
