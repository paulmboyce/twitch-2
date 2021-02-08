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

describe("Test component <StreamDelete> with state", () => {
	let TEST_STATE;
	let mockStore;
	const mockHistory = createBrowserHistory();
	let mockThunkDispatcher;
	let mockCallToGetStreamFromServer;

	const mockServer = setupServer(
		rest.delete("http://localhost:3004/streams/:streamId", (req, res, ctx) => {
			return res(ctx.status(200));
		}),
		rest.get("http://localhost:3004/streams/:streamId", (req, res, ctx) => {
			mockCallToGetStreamFromServer(req.params.streamId);
			return res(ctx.status(200));
		})
	);

	beforeAll(() => {
		mockServer.listen();
	});

	beforeEach(() => {
		render(<div id="modal-root"></div>);

		mockCallToGetStreamFromServer = jest.fn(function (params) {
			console.log("mockCallToGetStreamFromServer called with: ", params);
		});
		mockThunkDispatcher = jest.fn(() => {});
		TEST_STATE = {
			streams: {
				9999: {
					title: "title for stream-9999",
					desc: "description for stream-9999",
				},
			},
		};
		mockStore = configureMockStore([thunk])(TEST_STATE);
		mockStore.dispatch = jest.fn((action) => {
			if (typeof action === "function") {
				action(mockThunkDispatcher, mockStore.getState);
			}
		});
	});

	function renderStreamDeleteComponent() {
		render(
			<Provider store={mockStore}>
				<Router history={mockHistory}>
					<StreamDelete match={{ params: { streamId: 9999 } }} />
				</Router>
			</Provider>
		);
	}

	afterAll(() => {
		mockServer.close();
	});

	it("renders OK with title and button labels", () => {
		//ARR
		renderStreamDeleteComponent();

		//ASS
		expect(screen.getByText(/WANT TO DELETE STREAM/i)).toHaveTextContent(
			/title for stream-9999/
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
		renderStreamDeleteComponent();
		mockHistory.push("/some-random-path");
		expect(document.location.pathname).toEqual("/some-random-path");

		//ACT
		const btnCancel = screen.getByRole("button", { name: /^NO$/ });
		fireEvent.click(btnCancel);

		//ASS
		expect(document.location.pathname).toEqual("/");
	});

	it("navigates home on click OK button", () => {
		//ARR
		renderStreamDeleteComponent();
		mockHistory.push("/some-random-path");
		expect(document.location.pathname).toEqual("/some-random-path");

		//ACT
		const btnOK = screen.getByRole("button", { name: /^DELETE$/ });
		fireEvent.click(btnOK);

		//ASS
		expect(document.location.pathname).toEqual("/");
	});

	it("displays title of stream to be deleted", function () {
		//ARR
		renderStreamDeleteComponent();
		TEST_STATE = {
			streams: {
				9998: {
					title: "title for stream-9998",
					desc: "description for stream-9998",
				},
			},
		};
		//ACT

		//ASS
		expect(screen.getByText(/WANT TO DELETE STREAM/i)).toHaveTextContent(
			"title for stream-9999"
		);
	});

	it("emits a DELETE_STREAM action", async function () {
		//ARR
		renderStreamDeleteComponent();

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

	it("gets stream from server if not in state", async () => {
		//ARR
		const thisStreamIdDoesNotExist = "7777";
		render(
			<Provider store={mockStore}>
				<Router history={mockHistory}>
					<StreamDelete
						match={{ params: { streamId: thisStreamIdDoesNotExist } }}
					/>
				</Router>
			</Provider>
		);

		//ASS
		await waitFor(() => {
			expect(mockCallToGetStreamFromServer).toHaveBeenCalled();
		});
		expect(mockCallToGetStreamFromServer).toHaveBeenCalledTimes(1);
		expect(mockCallToGetStreamFromServer).toHaveBeenCalledWith("7777");
	});
});
