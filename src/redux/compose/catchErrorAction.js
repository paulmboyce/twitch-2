import { ERROR } from "../actionTypes";

const catchErrorAction = (error) => {
	console.log(error);
	return {
		type: ERROR,
		payload: { error },
	};
};

export default catchErrorAction;
