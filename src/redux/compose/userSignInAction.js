import { USER_SIGNED_IN } from "../actionTypes";

const userSignInAction = (userId) => {
	return {
		type: USER_SIGNED_IN,
		payload: { userId },
	};
};

export default userSignInAction;
