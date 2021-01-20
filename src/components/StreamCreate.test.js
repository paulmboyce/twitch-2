// PROD API
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import thunk from "redux-thunk";

// TEST APIS/MOCKS etc
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import configureMockStore from "redux-mock-store";
import { createBrowserHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";

// TEST SUBJECT:
import StreamCreate from "./StreamCreate";

describe("Test StreamCreate (with mock Redux & bypassed redux-form", () => {
	const TEST_STATE = {
		auth: { userId: "a string value" },
	};

	const TEST_STREAM = {
		title: "a title",
		desc: "a description",
	};

	let mockStore;
	let mockHistory = createBrowserHistory();

	const mockThunkDispatcher = jest.fn((action) => {
		console.log("DISPATCHNG: ", action);
	});

	const mockServer = setupServer(
		rest.post("http://localhost:3004/streams/", (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(TEST_STREAM));
		})
	);

	beforeAll(() => {
		mockServer.listen();
	});

	afterAll(() => {
		mockServer.close();
	});

	beforeEach(() => {
		mockStore = configureMockStore([thunk])(TEST_STATE);

		const mockGetState = jest.fn(() => {
			return mockStore.getState();
		});

		const ignoreReduxFormAction = (action) => {
			if (action.type && action.type.includes("@@redux-form")) {
				return;
			}
		};

		mockStore.dispatch = jest.fn(async (action) => {
			ignoreReduxFormAction(action);

			if (typeof action === "function") {
				action(mockThunkDispatcher, mockGetState);
			}
		});

		render(
			<Provider store={mockStore}>
				<Router history={mockHistory}>
					<StreamCreate />
				</Router>
			</Provider>
		);
	});

	it("dispatches 'CREATE_STREAM' action on SAVE button click", async () => {
		mockHistory.push("/ANY_NOT_HOME");
		await waitFor(() => expect(document.location.pathname).not.toEqual("/"));

		//ARR
		const titleInput = screen.getByLabelText(/title/i);
		fireEvent.change(titleInput, { target: { value: TEST_STREAM.title } });
		const descriptionInput = screen.getByLabelText(/title/i);
		fireEvent.change(descriptionInput, {
			target: { value: TEST_STREAM.desc },
		});

		//ACT
		expect(screen.getByText(/save/i)).toBeInTheDocument();
		const leftClick = { button: 0 };
		userEvent.click(screen.getByText(/save/i), leftClick);

		//ASS (wait for server call (POST) to complete)
		await waitFor(() => expect(mockThunkDispatcher).toHaveBeenCalledTimes(1));

		const expectedAction = {
			type: "CREATE_STREAM",
			payload: {
				stream: TEST_STREAM,
			},
		};
		expect(mockThunkDispatcher).toHaveBeenCalledWith(expectedAction);
		expect(document.location.pathname).toEqual("/");
	});

	it("navigates on CANCEL button click", () => {});

	it("warns if a title is not entered, on SAVE button click", () => {
		//		fail();
	});
});
