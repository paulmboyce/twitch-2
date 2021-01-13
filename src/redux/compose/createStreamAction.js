import { CREATE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";

const createStreamAction = (streamValues) => {
	return (dispatch) => {
		restApi.post("/", streamValues).then(({ data }) => {
			dispatch({
				type: CREATE_STREAM,
				payload: { stream: data },
			});
		});
	};
};

export default createStreamAction;
