import { USER_SIGNED_OUT } from "../types";

const userSignOutAction = () => {
	return {
		type: USER_SIGNED_OUT,
	};
};

export default userSignOutAction;
