import { ADD_STREAM } from "../types";

const addStreamAction = (stream) => {
	return {
		type: ADD_STREAM,
		payload: { stream },
	};
};

export default addStreamAction;
