import { ERROR } from "./redux/actionTypes";

const throwErrorToState = (error) => {
	console.log(error);
	return {
		type: ERROR,
		payload: { error },
	};
};

export default throwErrorToState;
