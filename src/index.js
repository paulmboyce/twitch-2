import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import App from "./components/App";
import reduceSignedInUser from "./redux/reduce/reduceSignedInUser";
const store = createStore(
	combineReducers({
		auth: reduceSignedInUser,
	})
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
