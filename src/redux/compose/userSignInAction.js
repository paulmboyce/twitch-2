const userSignInAction = () => {
	return {
		type: "USER_SIGNED_IN",
		payload: { isSignedIn: true },
	};
};

export default userSignInAction;
