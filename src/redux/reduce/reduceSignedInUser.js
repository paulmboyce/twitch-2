const INITIAL_STATE = { isSignedIn: null };

const reduceSignedInUser = (oldState = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case "USER_SIGNED_IN":
			console.log("returning..", { ...payload });
			return { ...payload };
		case "USER_SIGNED_OUT":
			console.log("returning..", { ...payload });
			return { ...payload };
		default:
			console.log("Returning oldState...", oldState);
			return oldState;
	}
};

export default reduceSignedInUser;
