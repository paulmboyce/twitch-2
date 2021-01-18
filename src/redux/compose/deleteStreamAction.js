import { DELETE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";
import catchErrorAction from "./catchErrorAction";

const deleteStreamAction = (streamId) => {
	console.log("delete stream actions", streamId);
	return (dispatch) => {
		restApi
			.delete(`/${streamId}`)
			.then(() => {
				dispatch({
					type: DELETE_STREAM,
					payload: { streamId },
				});
			})
			.catch((err) => {
				dispatch(catchErrorAction(err));
			});
	};
};

export default deleteStreamAction;
