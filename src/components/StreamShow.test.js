//TEST LIBS
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

//SUPPORT LIBS
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";

// TESTEE
import StreamShow from "./StreamShow";

const mockHistory = createBrowserHistory();

let TEST_STATE;

describe("Component: ShowStream", function () {
	const mockCallToServer = jest.fn();

	const mockserver = setupServer(
		rest.get("http://localhost:3004/streams/:streamId", (req, res, ctx) => {
			mockCallToServer(req.params.streamId);
			return res(ctx.status(200));
		})
	);

	beforeAll(function () {
		mockserver.listen();
	});
	afterAll(function () {
		mockserver.close();
	});

	beforeEach(function () {
		TEST_STATE = {
			streams: {
				9999: {
					title: "title for stream-9999",
					desc: "description for stream-9999",
				},
			},
		};
	});

	const renderStreamShowComponent = () =>
		render(
			<Provider store={configureMockStore([thunk])(TEST_STATE)}>
				<Router history={mockHistory}>
					<StreamShow match={{ params: { streamId: 9999 } }} />
				</Router>
			</Provider>
		);

	it("shows title and description", function () {
		//ARR
		renderStreamShowComponent();

		//ASS
		const title = screen.getByText(/TITLE/i);
		expect(title).toHaveTextContent("title for stream-9999");

		const description = screen.getByText(/DESC/i);
		expect(description).toHaveTextContent("description for stream-9999");
	});

	it("reads from server if stream not in STATE", async function () {
		//ARR
		const idNotInState = 7777;
		render(
			<Provider store={configureMockStore([thunk])(TEST_STATE)}>
				<Router history={mockHistory}>
					<StreamShow match={{ params: { streamId: idNotInState } }} />
				</Router>
			</Provider>
		);

		await waitFor(() => {
			expect(mockCallToServer).toHaveBeenCalledWith("7777");
		});
	});
});
