import React from "react";
import { Link } from "react-router-dom";

import GoogleAuthButton from "./GoogleAuthButton";

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<Link className="item " to="/">
				List Streams
			</Link>
			<Link className="item" to="/streams/edit">
				Edit a Stream
			</Link>
			<Link className="item" to="/streams/delete">
				Delete a Stream
			</Link>
			<Link className="item" to="/streams/show">
				Show Stream
			</Link>
			<div className="right menu">
				<div className="ui item">
					<GoogleAuthButton />
				</div>
			</div>
		</div>
	);
};

export default Header;
