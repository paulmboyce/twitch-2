import { CREATE_STREAM, ERROR } from "../actionTypes";
import { restApi } from "../../api/axios/axios";
import history from "../../history";

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
			.catch((error) => {
				dispatch({
					type: ERROR,
					payload: { error: error },
				});
				console.log("ERROR in createStreamAction(): ", error);
			});
	};
};

export default createStreamAction;
