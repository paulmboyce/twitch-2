import { ADD_STREAM, GET_STREAMS } from "../types";

const reduceStreams = (oldStreams = [], { type, payload }) => {
	if (type === ADD_STREAM) {
		return [...oldStreams, payload.stream];
	}

	if (type === GET_STREAMS) {
		return payload.streams;
	}

	return oldStreams;
};

export default reduceStreams;
