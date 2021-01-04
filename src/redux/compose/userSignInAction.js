import { USER_SIGNED_IN } from "../types";

const userSignInAction = () => {
	return {
		type: USER_SIGNED_IN,
	};
};

export default userSignInAction;
