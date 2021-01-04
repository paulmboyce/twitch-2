import { USER_SIGNED_IN, USER_SIGNED_OUT } from "../types";

const INITIAL_STATE = { isUserSignedIn: null };

const reduceSignedInUser = (oldState = INITIAL_STATE, { type }) => {
	switch (type) {
		case USER_SIGNED_IN:
			return { ...oldState, isUserSignedIn: true };
		case USER_SIGNED_OUT:
			return { ...oldState, isUserSignedIn: false };
		default:
			return oldState;
	}
};

export default reduceSignedInUser;
