import React from "react";
import ReactDOM from "react-dom";
import "./AbstractModal.css";

// Let's create a Modal component that is an abstraction around
// the portal API.

class AbstractModal extends React.Component {
	constructor(props) {
		super(props);
		// Create a div that we'll render the modal into. Because each
		// Modal component has its own element, we can render multiple
		// modal components into the modal container.
		this.modalRoot = document.getElementById("modal-root");
		this.el = document.createElement("div");
	}

	componentDidMount() {
		// Append the element into the DOM on mount. We'll render
		// into the modal container element.
		this.modalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		// Remove the element from the DOM when we unmount
		this.modalRoot.removeChild(this.el);
	}

	render() {
		// Use a portal to render the children into the element
		return ReactDOM.createPortal(
			// Any valid React child: JSX, strings, arrays, etc.
			this.props.children,
			// This DOM element is our modal container
			this.el
		);
	}
}

export default AbstractModal;
