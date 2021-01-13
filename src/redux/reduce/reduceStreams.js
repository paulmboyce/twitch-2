import omit from "lodash.omit";
import mapKeys from "lodash.mapkeys";

import { CREATE_STREAM, GET_STREAMS, DELETE_STREAM } from "../actionTypes";

const reduceStreams = (oldStreams = {}, { type, payload }) => {
	switch (type) {
		case CREATE_STREAM:
			return { ...oldStreams, [payload.stream.id]: payload.stream };

		case GET_STREAMS:
			return mapKeys(payload.streams, "id");

		case DELETE_STREAM:
			return omit(oldStreams, [payload.streamId]);

		default:
			return oldStreams;
	}
};

export default reduceStreams;
