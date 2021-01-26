import omit from "lodash.omit";
import mapKeys from "lodash.mapkeys";

import {
	CREATE_STREAM,
	UPDATE_STREAM,
	GET_STREAM,
	GET_STREAMS,
	DELETE_STREAM,
} from "../actionTypes";

const reduceStreams = (oldStreams = {}, { type, payload }) => {
	switch (type) {
		case CREATE_STREAM:
			return { ...oldStreams, [payload.stream.id]: payload.stream };

		case UPDATE_STREAM:
			return { ...oldStreams, [payload.stream.id]: payload.stream };

		case GET_STREAM:
			return { ...oldStreams, [payload.stream.id]: payload.stream };

		case GET_STREAMS:
			// Bulletproof by merging onto oldStreams (even though the
			// payload SHOULD be the complete streams data set).
			return { ...oldStreams, ...mapKeys(payload.streams, "id") };

		case DELETE_STREAM:
			return omit(oldStreams, [payload.streamId]);

		default:
			return oldStreams;
	}
};

export default reduceStreams;
