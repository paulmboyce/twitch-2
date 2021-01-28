import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";

import App from "./components/App";
import reduceSignedInUser from "./redux/reduce/reduceSignedInUser";
import reduceStreams from "./redux/reduce/reduceStreams";
import reduceErrors from "./redux/reduce/reduceErrors";

const store = createStore(
	combineReducers({
		auth: reduceSignedInUser,
		form: formReducer,
		streams: reduceStreams,
		error: reduceErrors,
	}),
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
