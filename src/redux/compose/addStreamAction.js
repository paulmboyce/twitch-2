import { CREATE_STREAM } from "../types";
import { restApi } from "../../api/axios/axios";

const addStreamAction = (formValues) => {
	return (dispatch) => {
		restApi.post("/", formValues).then(({ data }) => {
			dispatch({
				type: CREATE_STREAM,
				payload: { stream: data },
			});
		});
	};
};

export default addStreamAction;
