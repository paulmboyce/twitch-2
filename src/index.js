import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";

import App from "./components/App";
import reduceSignedInUser from "./redux/reduce/reduceSignedInUser";
const store = createStore(
	combineReducers({
		auth: reduceSignedInUser,
		form: formReducer,
	}),
	composeWithDevTools()
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
