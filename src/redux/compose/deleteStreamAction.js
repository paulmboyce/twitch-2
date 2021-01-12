import { DELETE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";
const deleteStreamAction = (streamId) => {
	console.log("delete stream actions", streamId);
	return (dispatch) => {
		restApi.delete(`/${streamId}`).then(() => {
			dispatch({
				type: DELETE_STREAM,
				payload: { streamId },
			});
		});
	};
};

export default deleteStreamAction;
