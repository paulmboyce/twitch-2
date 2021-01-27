import { UPDATE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";
import history from "../../history";
import catchErrorAction from "./catchErrorAction";

const updateStreamAction = (streamId, formValues) => {
	return (dispatch) => {
		restApi
			.patch(`/${streamId}`, formValues)
			.then(({ data }) => {
				dispatch({ type: UPDATE_STREAM, payload: { stream: data } });
				history.push("/");
			})
			.catch((err) => {
				dispatch(catchErrorAction(err));
			});
	};
};

export default updateStreamAction;
