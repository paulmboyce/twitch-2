import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { OAUTH_CLIENT_ID } from "../api/google/oauth";
import userSignInAction from "../redux/compose/userSignInAction";
import userSignOutAction from "../redux/compose/userSignOutAction";

const GoogleAuthButton = ({ dispatch, isUserSignedIn }) => {
	useEffect(() => {
		const initSigninV2 = function () {
			global.gapi.auth2.init({ clientId: OAUTH_CLIENT_ID }).then((auth2) => {
				console.log("GoogleAuth loaded OK");
				auth2.isSignedIn.listen(onAuthChange);
				initStatus(auth2.isSignedIn.get());
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
			const userId = global.gapi.auth2
				.getAuthInstance()
				.currentUser.get()
				.getId();
			console.log("USER ID: ", userId);
			dispatch(userSignInAction(userId));
		} else {
			dispatch(userSignOutAction());
		}

		console.log("User is Signed In: ", isSignedIn);
	};

	const onButtonClick = () => {
		const signOut = () => {
			global.gapi.auth2
				.getAuthInstance()
				.signOut()
				.then(() => {
					console.log("Logged Out OK");
				});
		};

		const signIn = () => {
			global.gapi.auth2
				.getAuthInstance()
				.signIn({ scope: "email" })
				.then(
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
	return { isUserSignedIn: state.auth.isUserSignedIn };
};
export default connect(mapStateToProps)(GoogleAuthButton);
