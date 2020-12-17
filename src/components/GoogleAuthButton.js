import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { OAUTH_CLIENT_ID } from "../api/google/oauth";

const GoogleAuthButton = () => {
	const [_auth2, _setAuth2] = useState(null);
	const [_gapi, _setGapi] = useState(null);
	const [isSignedIn, setIsSignedIn] = useState(null);

	useEffect(() => {
		const setGapi = () => {
			if (global.gapi) {
				console.log("Setting _GAPI..");
				_setGapi(global.gapi);
			}
		};
		const waitForGapi = () => {
			const id = window.setTimeout(() => {
				setGapi();
			}, 500);
			return id;
		};
		if (global.gapi) {
			setGapi();
		} else {
			console.log("Waiting for GAPI...");
			waitForGapi();
		}
	}, []);

	useEffect(() => {
		const initSigninV2 = function () {
			_gapi.auth2.init({ clientId: OAUTH_CLIENT_ID }).then((auth2) => {
				console.log("GoogleAuth loaded OK");
				auth2.isSignedIn.listen(onAuthChange);
				initStatus(auth2.isSignedIn.get());
				_setAuth2(auth2);
			});
		};

		if (_gapi) {
			console.log("Loading AUTH2..");
			_gapi.load("client:auth2", initSigninV2);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_gapi]);

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

	const signOut = () => {
		_auth2.signOut().then(() => {
			console.log("Logged Out OK");
		});
	};

	const initStatus = (isSignedIn) => {
		onAuthChange(isSignedIn);
	};

	const onAuthChange = (isSignedIn) => {
		setIsSignedIn(isSignedIn);
		console.log("User is Signed In: ", isSignedIn);
	};

	const onButtonClick = () => {
		if (isSignedIn) {
			signOut();
		} else {
			signIn();
		}
	};

	return (
		<div
			className="ui red button"
			onClick={() => {
				onButtonClick();
			}}
		>
			<Link style={{ color: "white" }} to="">
				{isSignedIn ? "Log Out" : "Login with Google"}
			</Link>
		</div>
	);
};
export default GoogleAuthButton;
