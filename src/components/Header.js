import React from "react";
import { Link } from "react-router-dom";

import GoogleAuthButton from "./GoogleAuthButton";

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<Link className="item " to="/">
				Home
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
