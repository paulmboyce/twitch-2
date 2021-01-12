import { USER_SIGNED_OUT } from "../actionTypes";

const userSignOutAction = () => {
	return {
		type: USER_SIGNED_OUT,
	};
};

export default userSignOutAction;
