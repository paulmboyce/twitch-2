import { restApi } from "../../api/axios/axios";
import { GET_STREAMS } from "../actionTypes";

import catchErrorAction from "./catchErrorAction";

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
				dispatch(catchErrorAction(err));
			});
	};
};

export default getStreamsAction;
