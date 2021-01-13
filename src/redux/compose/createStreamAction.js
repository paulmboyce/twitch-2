import { CREATE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";

const createStreamAction = (streamValues) => {
	return (dispatch, getState) => {
		const { auth } = getState();
		streamValues["owner"] = auth.userId;

		restApi.post("/", streamValues).then(({ data }) => {
			dispatch({
				type: CREATE_STREAM,
				payload: { stream: data },
			});
		});
	};
};

export default createStreamAction;
