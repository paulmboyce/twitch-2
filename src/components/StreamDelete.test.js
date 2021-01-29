import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// TEST ARTIFACTS/MOCKING
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { createBrowserHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";

// TESTEE:
import StreamDelete from "./StreamDelete";

describe("Test component <StreamDelete>", () => {
	const TEST_STATE = {};

	let mockStore;
	const mockHistory = createBrowserHistory();
	let mockThunkDispatcher;

	const mockServer = setupServer(
		rest.delete("http://localhost:3004/streams/:streamId", (req, res, ctx) => {
			return res(ctx.status(200));
		})
	);

	beforeAll(() => {
		mockServer.listen();
	});

	beforeEach(() => {
		render(<div id="modal-root"></div>);

		mockThunkDispatcher = jest.fn(() => {});

		mockStore = configureMockStore([thunk])(TEST_STATE);
		mockStore.dispatch = jest.fn((action) => {
			if (typeof action === "function") {
				action(mockThunkDispatcher, mockStore.getState);
			}
		});
	});

	afterAll(() => {
		mockServer.close();
	});

	it("renders OK with title and button labels", () => {
		render(
			<Provider store={mockStore}>
				<Router history={mockHistory}>
					<StreamDelete />
				</Router>
			</Provider>
		);

		//ASS
		expect(screen.getByText(/WANT TO DELETE THIS STREAM/i)).toHaveTextContent(
			/^Want to delete this stream\?$/
		);
		expect(screen.getByRole("button", { name: /no/i })).toHaveTextContent(
			/^NO$/
		);
		expect(screen.getByRole("button", { name: /delete/i })).toHaveTextContent(
			/^DELETE$/
		);
	});

	it("navigates home on click CANCEL button", () => {
		//ARR
		mockHistory.push("/some-random-path");
		expect(document.location.pathname).toEqual("/some-random-path");
		render(
			<Provider store={mockStore}>
				<Router history={mockHistory}>
					<StreamDelete />
				</Router>
			</Provider>
		);

		//ACT
		const btnCancel = screen.getByRole("button", { name: /^NO$/ });
		fireEvent.click(btnCancel);

		//ASS
		expect(document.location.pathname).toEqual("/");
	});

	it("navigates home on click OK button", () => {
		//ARR
		mockHistory.push("/some-random-path");
		expect(document.location.pathname).toEqual("/some-random-path");
		render(
			<Provider store={mockStore}>
				<Router history={mockHistory}>
					<StreamDelete match={{ params: { streamId: 9999 } }} />
				</Router>
			</Provider>
		);

		//ACT
		const btnOK = screen.getByRole("button", { name: /^DELETE$/ });
		fireEvent.click(btnOK);

		//ASS
		expect(document.location.pathname).toEqual("/");
	});

	xit("displays title of stream to be deleted", function () {
		//ARR
		render(
			<Provider store={mockStore}>
				<Router history={mockHistory}>
					<StreamDelete match={{ params: { streamId: 9999 } }} />
				</Router>
			</Provider>
		);
		//ACT

		//ASS
		expect(screen.getByText(/want to delete/)).toEqual(
			"Want to delete this stream?"
		);
	});

	it("emits a DELETE_STREAM action", async function () {
		//ARR
		render(
			<Provider store={mockStore}>
				<Router history={mockHistory}>
					<StreamDelete match={{ params: { streamId: 9999 } }} />
				</Router>
			</Provider>
		);

		//ACT
		const btnDelete = screen.getByRole("button", { name: /DELETE/i });
		fireEvent.click(btnDelete);
		await waitFor(() => {
			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
			expect(mockThunkDispatcher).toHaveBeenCalledTimes(1);
		});

		//ASS
		const deleteAction = {
			type: "DELETE_STREAM",
			payload: { streamId: 9999 },
		};
		expect(mockThunkDispatcher).toHaveBeenCalledWith(deleteAction);
	});
});
