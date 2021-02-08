import React, { useEffect } from "react";
import Header from "../components/Header";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import StreamList from "../components/StreamList";
import StreamCreate from "../components/StreamCreate";
import StreamEdit from "../components/StreamEdit";
import StreamDelete from "../components/StreamDelete";
import StreamShow from "../components/StreamShow";
import getStreamsAction from "../redux/compose/getStreamsAction";
import ErrorHeader from "../components/ErrorHeader";
import history from "../history";

const App = ({ dispatch }) => {
	useEffect(() => {
		dispatch(getStreamsAction());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="ui container">
			<Router history={history}>
				<div>
					<Header />
					<ErrorHeader />

					<Route path="/" exact component={StreamList} />
					<Route path="/streams/new" component={StreamCreate} />
					<Route path="/streams/edit/:streamId" component={StreamEdit} />
					<Route path="/streams/delete/:streamId" component={StreamDelete} />
					<Route path="/streams/show/:streamId" component={StreamShow} />
				</div>
			</Router>
		</div>
	);
};

export default connect()(App);
