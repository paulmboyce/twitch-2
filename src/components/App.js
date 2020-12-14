import React from "react";
import Header from "../components/Header";
import { MemoryRouter as Router, Route } from "react-router-dom";

import StreamList from "../components/StreamList";
import StreamCreate from "../components/StreamCreate";
import StreamEdit from "../components/StreamEdit";
import StreamDelete from "../components/StreamDelete";
import StreamShow from "../components/StreamShow";

const App = () => {
	return (
		<div>
			<Router>
				<div>
					<Header />
					<Route path="/" exact component={StreamList} />
					<Route path="/streams/new" component={StreamCreate} />
					<Route path="/streams/edit" component={StreamEdit} />
					<Route path="/streams/delete" component={StreamDelete} />
					<Route path="/streams/show" component={StreamShow} />
				</div>
			</Router>
		</div>
	);
};

export default App;
