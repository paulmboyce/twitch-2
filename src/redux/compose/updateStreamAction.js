import { UPDATE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";
import history from "../../history";
import catchErrorAction from "./catchErrorAction";

const updateStreamAction = (formValues) => {
	return (dispatch) => {
		restApi
			.patch(`/${formValues.id}`, formValues)
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
