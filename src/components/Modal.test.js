import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Modal from "./Modal";

describe("Test Modal:", () => {
	beforeEach(() => {
		//ARR
		// Create container for our Modal,
		// to replicate same DIV in public/index.html
		render(<div id="modal-root" />);
	});

	it("renders onscreen by default", () => {
		//ARR
		const title = "some random title only for this modal";
		const rxExactModalTitle = new RegExp(`^${title}$`);
		const notFound = screen.queryByText(rxExactModalTitle);
		expect(notFound).not.toBeInTheDocument();

		//ACT
		render(<Modal title={title} />);

		//ASS
		const found = screen.queryByText(rxExactModalTitle);
		expect(found).toBeInTheDocument();
	});

	it("closes when click on the background", () => {
		// ARR
		render(<Modal />);

		//ACT
		let background = screen.getByTestId("id-modal-container");
		fireEvent.click(background);

		//ASS
		background = screen.queryByTestId("id-modal-container");
		expect(background).not.toBeInTheDocument();
	});

	it("stays open when click on the central form", () => {
		// ARR
		render(<Modal />);

		//ACT
		let centre = screen.getByTestId("id-modal-centre");
		fireEvent.click(centre);

		//ASS
		centre = screen.queryByTestId("id-modal-centre");
		expect(centre).toBeInTheDocument();
	});

	it("renders a default Title", () => {
		//ACT
		render(<Modal />);

		//ASS
		const title = screen.getByText(/Want to proceed/i);
		expect(title).toHaveTextContent("Want to proceed?");
	});

	it("allows to set a Title", () => {
		//ACT
		render(<Modal title="This is a title" />);

		//ASS
		const title = screen.getByText(/his is a title/i);
		expect(title).toHaveTextContent(/^This is a title$/);
	});

	it("renders a default OK button", () => {
		//ACT
		render(<Modal />);

		//ASS
		const okButton = screen.getByRole("button", { name: /OK/i });
		expect(okButton).toHaveTextContent("OK");
	});

	it("allows to set OK button text", () => {
		//ACT
		render(<Modal okLabel="Proceed" />);

		//ASS
		const okButton = screen.getByRole("button", { name: /PROCEED/i });
		expect(okButton).toHaveTextContent(/^Proceed$/);
	});

	it("renders a default CANCEL BUTTON", () => {
		//ACT
		render(<Modal />);

		//ASS
		const cancelButton = screen.getByRole("button", { name: /CANCEL/i });
		expect(cancelButton).toHaveTextContent("CANCEL");
	});

	it("allows to set CANCEL button text", () => {
		// ACT
		render(<Modal cancelLabel="some cancel text" />);

		//ASS
		const btn = screen.getByRole("button", { name: /SOME CANCEL TEXT/i });
		expect(btn).toHaveTextContent(/^some cancel text$/);
	});

	it("fires OK function on OK button submit", () => {
		//ARR
		const mockFnOK = jest.fn();
		render(<Modal okLabel="OK" onClickOk={mockFnOK} />);

		//ACT
		const btnOK = screen.getByRole("button", { name: "OK" });
		fireEvent.click(btnOK);

		//ASS
		expect(mockFnOK).toHaveBeenCalledTimes(1);
	});

	it("fires cancel event on click cancel button", () => {
		//ARR
		const mockFnCancel = jest.fn();
		render(<Modal cancelLabel="CANCEL" onClickCancel={mockFnCancel} />);

		//ACT
		const btnCancel = screen.getByRole("button", { name: /CANCEL/i });
		fireEvent.click(btnCancel);

		//ASS
		expect(mockFnCancel).toHaveBeenCalledTimes(1);
	});
});
