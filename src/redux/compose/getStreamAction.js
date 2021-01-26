import { restApi } from "../../api/axios/axios";
import { GET_STREAM } from "../actionTypes";

import catchErrorAction from "./catchErrorAction";

const getStreamAction = (id) => {
	return (dispatch) => {
		restApi
			.get(`/${id}`)
			.then(({ data }) => {
				dispatch({
					type: GET_STREAM,
					payload: { stream: data },
				});
			})
			.catch((err) => {
				dispatch(catchErrorAction(err));
			});
	};
};

export default getStreamAction;
