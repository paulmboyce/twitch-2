import { CREATE_STREAM, GET_STREAMS, DELETE_STREAM } from "../types";

const reduceStreams = (oldStreams = [], { type, payload }) => {
	switch (type) {
		case CREATE_STREAM:
			return [...oldStreams, payload.stream];

		case GET_STREAMS:
			return [...payload.streams];

		case DELETE_STREAM:
			console.log(DELETE_STREAM, payload);
			return oldStreams.filter((stream) => {
				return stream.id !== payload.streamId;
			});

		default:
			return oldStreams;
	}
};

export default reduceStreams;
