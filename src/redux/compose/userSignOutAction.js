const userSignOutAction = () => {
	return {
		type: "USER_SIGNED_OUT",
		payload: { isSignedIn: false },
	};
};

export default userSignOutAction;
