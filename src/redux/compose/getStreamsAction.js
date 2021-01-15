import { restApi } from "../../api/axios/axios";
import { GET_STREAMS } from "../actionTypes";

import throwErrorToState from "../../error";

const getStreamsAction = () => {
	return (dispatch) => {
		restApi
			.get("/")
			.then(({ data }) => {
				dispatch({
					type: GET_STREAMS,
					payload: { streams: data },
				});
			})
			.catch((err) => {
				dispatch(throwErrorToState(err));
			});
	};
};

export default getStreamsAction;
