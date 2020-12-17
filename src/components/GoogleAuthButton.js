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
				console.log("Setting GAPI...");
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
			const id = waitForGapi();
			return () => {
				console.log("Clearing timeput GAPI...");
				window.clearTimeout(id);
			};
		}
	}, []);

	useEffect(() => {
		if (_gapi) {
			console.log("GAPI initialised, loading AUTH2...", _gapi);
			_gapi.load("auth2", initSigninV2);
			console.log("client:auth2 requested...");
		}
	}, [_gapi]);

	const initSigninV2 = function () {
		_gapi.auth2.init({ clientId: OAUTH_CLIENT_ID }).then((auth2) => {
			console.log("GoogleAuth loaded..OK");
			_setAuth2(auth2);
			auth2.isSignedIn.listen(onAuthChange);
			initStatus(auth2.isSignedIn.get());
		});
	};

	const onClickLogIn = () => {
		_auth2.signIn({ scope: "email" }).then(
			(user) => {
				console.log("Logged in OK: ", user);
			},
			function rejected(err) {
				console.log("Error: ", err);
			}
		);
	};

	const onClickLogOut = () => {
		_auth2.signOut().then(() => {
			console.log("Logged Out OK");
		});
	};

	const initStatus = (isSignedIn) => {
		onAuthChange(isSignedIn);
	};

	const onAuthChange = (isSignedIn) => {
		setIsSignedIn(isSignedIn);
		console.log("onAuthChange(): >> isSignedIn", isSignedIn);
	};

	const authorize = (e) => {
		console.log("clicked!!", e.target.text);

		if (isSignedIn) {
			onClickLogOut();
		} else {
			onClickLogIn();
		}
	};

	return (
		<div
			className="ui red button"
			onClick={(e) => {
				authorize(e);
			}}
		>
			<Link style={{ color: "white" }}>
				{isSignedIn ? "Log Out" : "Login with Google"}
			</Link>
		</div>
	);
};
export default GoogleAuthButton;
