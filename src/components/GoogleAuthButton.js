import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { OAUTH_CLIENT_ID } from "../api/google/oauth";
import userSignInAction from "../redux/compose/userSignInAction";
import userSignOutAction from "../redux/compose/userSignOutAction";

const GoogleAuthButton = ({ dispatch, isUserSignedIn }) => {
	const [_auth2, _setAuth2] = useState(null);

	useEffect(() => {
		const initSigninV2 = function () {
			global.gapi.auth2.init({ clientId: OAUTH_CLIENT_ID }).then((auth2) => {
				console.log("GoogleAuth loaded OK");
				auth2.isSignedIn.listen(onAuthChange);
				initStatus(auth2.isSignedIn.get());
				_setAuth2(auth2);
			});
		};

		if (global.gapi) {
			console.log("Loading AUTH2..");
			global.gapi.load("client:auth2", initSigninV2);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const initStatus = (isSignedIn) => {
		onAuthChange(isSignedIn);
	};

	const onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			dispatch(userSignInAction());
		} else {
			dispatch(userSignOutAction());
		}

		console.log("User is Signed In: ", isSignedIn);
	};

	const onButtonClick = () => {
		const signOut = () => {
			_auth2.signOut().then(() => {
				console.log("Logged Out OK");
			});
		};

		const signIn = () => {
			_auth2.signIn({ scope: "email" }).then(
				(user) => {
					console.log("Logged in OK: ", user);
				},
				(err) => {
					console.log("Error: ", err);
				}
			);
		};

		if (isUserSignedIn) {
			signOut();
		} else {
			signIn();
		}
	};

	return (
		<div className="ui red button" onClick={onButtonClick}>
			<Link style={{ color: "white" }} to="">
				{isUserSignedIn ? "Log Out" : "Login with Google"}
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { isUserSignedIn: state.userStatus.isUserSignedIn };
};
export default connect(mapStateToProps)(GoogleAuthButton);
