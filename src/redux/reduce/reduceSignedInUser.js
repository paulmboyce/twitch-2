import { USER_SIGNED_IN, USER_SIGNED_OUT } from "../types";

const INITIAL_STATE = { isUserSignedIn: null, userId: null };

const reduceSignedInUser = (oldState = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_SIGNED_IN:
			return {
				...oldState,
				isUserSignedIn: true,
				userId: action.payload.userId,
			};
		case USER_SIGNED_OUT:
			return { ...oldState, isUserSignedIn: false, userId: null };
		default:
			return oldState;
	}
};

export default reduceSignedInUser;
