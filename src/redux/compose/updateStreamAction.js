import { UPDATE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";
import history from "../../history";
import throwErrorToState from "../../error";

const updateStreamAction = (formValues) => {
	return (dispatch) => {
		restApi
			.patch(`/${formValues.id}`, formValues)
			.then(({ data }) => {
				dispatch({ type: UPDATE_STREAM, payload: { stream: data } });
				history.push("/");
			})
			.catch((err) => {
				dispatch(throwErrorToState(err));
			});
	};
};

export default updateStreamAction;
