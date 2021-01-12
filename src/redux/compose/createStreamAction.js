import { CREATE_STREAM } from "../actionTypes";
import { restApi } from "../../api/axios/axios";

const createStreamAction = (formValues) => {
	return (dispatch) => {
		restApi.post("/", formValues).then(({ data }) => {
			dispatch({
				type: CREATE_STREAM,
				payload: { stream: data },
			});
		});
	};
};

export default createStreamAction;
