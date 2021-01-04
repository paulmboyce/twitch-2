import { USER_SIGNED_IN } from "../types";

const userSignInAction = (userId) => {
	return {
		type: USER_SIGNED_IN,
		payload: { userId },
	};
};

export default userSignInAction;
