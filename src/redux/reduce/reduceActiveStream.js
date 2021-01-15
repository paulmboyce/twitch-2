import { EDIT_STREAM } from "../actionTypes";

const reduceActiveStream = (oldState = {}, { type, payload }) => {
	switch (type) {
		case EDIT_STREAM:
			return { ...payload.editStream };

		default:
			return oldState;
	}
};

export default reduceActiveStream;
