import { ADD_STREAM } from "../types";
import { restApi } from "../../api/axios/axios";

const addStreamAction = (formValues) => {
	return (dispatch) => {
		restApi.post("/", formValues).then(({ data }) => {
			console.log("DATA: ", data);
			dispatch({
				type: ADD_STREAM,
				payload: { stream: data },
			});
		});
	};
};

export default addStreamAction;
