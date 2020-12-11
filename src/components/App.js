import React from "react";
import { MemoryRouter as Router, Route, Link } from "react-router-dom";
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
					<button>
						<Link to="/">List Streams</Link>
					</button>
					<button>
						<Link to="/streams/new">Add a Stream</Link>
					</button>
					<button>
						<Link to="/streams/edit">Edit a Stream</Link>
					</button>
					<button>
						<Link to="/streams/delete">Delete a Stream</Link>
					</button>
					<button>
						<Link to="/streams/show">Show Stream</Link>
					</button>
					<hr />
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
