import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";

import ErrorHeader from "./ErrorHeader";

const mockStore = configureStore([]);

describe("Test ErrorHeader with Mocked Redux", () => {
	const TEST_STATE = {
		error: "some error message",
	};

	beforeEach(() => {
		render(
			<Provider store={mockStore(TEST_STATE)}>
				<ErrorHeader />
			</Provider>
		);
	});

	it("should render with given state from Redux store", () => {
		expect(screen.getByText("some error message")).toBeInTheDocument();
	});
});
