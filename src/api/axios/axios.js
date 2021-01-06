import axios from "axios";

const restApi = axios.create({
	baseURL: "http://localhost:3004/streams/",
	timeout: 1000,
});

export { restApi };
