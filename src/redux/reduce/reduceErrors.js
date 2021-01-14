import { ERROR } from "../actionTypes";

const reduceErrors = (oldState = "", { type, payload }) => {
	switch (type) {
		case ERROR:
			return payload.error.message ? payload.error.message : payload.error;
		default:
			return "";
	}
};

export default reduceErrors;
