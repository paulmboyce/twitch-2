import { ADD_STREAM } from "../types";

const reduceStreams = (oldStreams = [], { type, payload }) => {
	if (type === ADD_STREAM) {
		return [...oldStreams, payload.stream];
	}

	return oldStreams;
};

export default reduceStreams;
