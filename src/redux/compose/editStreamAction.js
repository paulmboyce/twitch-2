import { EDIT_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";
import history from "../../history";
import catchErrorAction from "./catchErrorAction";

const editStreamAction = (streamId) => {
	return (dispatch) => {
		return restApi
			.get(`/${streamId}`)
			.then(({ data }) => {
				dispatch({
					type: EDIT_STREAM,
					payload: { editStream: data },
				});
				history.push("/streams/edit");
			})
			.catch((err) => {
				dispatch(catchErrorAction(err));
			});
	};
};

export default editStreamAction;
