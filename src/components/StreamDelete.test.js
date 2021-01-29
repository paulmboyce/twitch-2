import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// TEST ARTIFACTS/MOCKING
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { createBrowserHistory } from "history";

// TESTEE:
import StreamDelete from "./StreamDelete";

describe("Test component <StreamDelete>", () => {
	const TEST_STATE = {
		state: { some: "value" },
		match: { params: { streamId: 9999 } },
	};

	let mockStore;
	const mockHistory = createBrowserHistory();

	beforeAll(() => {
    mockStore = configureMockStore([thunk])(TEST_STATE);
    mockStore.dispatch = jest.fn(async (action) => {
			ignoreReduxFormAction(action);

			if (typeof action === "function") {
				action(mockThunkDispatcher, mockGetState);
			}
		});

	});

	beforeEach(() => {
		render(<div id="modal-root"></div>);
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
});
