const INITIAL_STATE = { isSignedIn: null };

const reduceSignedInUser = (oldState = INITIAL_STATE, { type }) => {
	switch (type) {
		case "USER_SIGNED_IN":
			console.log("returning..", { ...oldState, isSignedIn: true });
			return { ...oldState, isSignedIn: true };
		case "USER_SIGNED_OUT":
			console.log("returning..", { ...oldState, isSignedIn: false });
			return { ...oldState, isSignedIn: false };
		default:
			console.log("Returning oldState...", oldState);
			return oldState;
	}
};

export default reduceSignedInUser;
