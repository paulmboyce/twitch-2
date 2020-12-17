const reduceSignedInUser = (oldUser = false, { type, payload }) => {
	switch (type) {
		case "USER_SIGNED_IN":
			return payload.status;
		case "USER_SIGNED_OUT":
			return payload.status;
		default:
			return oldUser;
	}
};

export default reduceSignedInUser;
