import { CREATE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";
import history from "../../history";
import throwErrorToState from "../../error";

const createStreamAction = (formValues) => {
	return (dispatch, getState) => {
		const { auth } = getState();
		restApi
			.post("/", { ...formValues, ownerId: auth.userId })
			.then(({ data }) => {
				history.push("/");
				dispatch({
					type: CREATE_STREAM,
					payload: { stream: data },
				});
			})
			.catch((err) => {
				dispatch(throwErrorToState(err));
			});
	};
};

export default createStreamAction;
