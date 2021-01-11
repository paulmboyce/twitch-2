import { restApi } from "../../api/axios/axios";
import { GET_STREAMS } from "../types";

const getStreamsAction = () => {
	return (dispatch) => {
		restApi.get("/").then(({ data }) => {
			dispatch({
				type: GET_STREAMS,
				payload: { streams: data },
			});
		});
	};
};

export default getStreamsAction;
