import _ from "lodash";

import { CREATE_STREAM, GET_STREAMS, DELETE_STREAM } from "../actionTypes";

const reduceStreams = (oldStreams = {}, { type, payload }) => {
	switch (type) {
		case CREATE_STREAM:
			return { ...oldStreams, [payload.stream.id]: payload.stream };

		case GET_STREAMS:
			return { ...payload.streams };

		case DELETE_STREAM:
			return _.omit(oldStreams, [payload.streamId]);

		default:
			return oldStreams;
	}
};

export default reduceStreams;
