import React, { useState, useEffect } from "react";

import { restApi } from "../api/axios/axios";

const byIdDesc = (a, b) => b.id - a.id;

const StreamList = () => {
	const [streams, setStreams] = useState([]);
	useEffect(() => {
		restApi.get("/").then(({ data }) => {
			setStreams(data);
		});
	}, []);

	const renderStreams = () => {
		return streams.sort(byIdDesc).map(({ id, title, desc }) => {
			return (
				<div key={id}>
					<b>{title}</b> - {desc}
				</div>
			);
		});
	};

	return (
		<div>
			<h1>Streams</h1>
			<hr />
			{renderStreams()}
		</div>
	);
};

export default StreamList;
