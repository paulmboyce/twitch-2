import React, { useEffect } from "react";
import { connect } from "react-redux";
import flvjs from "flv.js";

import getStreamAction from "../redux/compose/getStreamAction";

const StreamShow = ({ dispatch, stream, match }) => {
	const videoRef = React.createRef();
	const { streamId } = match.params;

	useEffect(function () {
		if (!stream) {
			dispatch(getStreamAction(streamId));
		}
	}, []);

	useEffect(() => {
		const flvPlayer = flvjs.createPlayer({
			type: "flv",
			url: `http://localhost:8000/live/${streamId}.flv`,
		});

		console.log("REF: ", videoRef.current);
		if (videoRef.current) {
			flvPlayer.attachMediaElement(videoRef.current);
			flvPlayer.load();
		}

		return () => {
			console.log("Unmounted...");
			flvPlayer.destroy();
		};
	}, [videoRef]);

	if (!stream) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<video ref={videoRef} style={{ width: "100%" }} controls></video>
			<h1>{stream.title}</h1>
			<h2>{stream.desc}</h2>

			<video id="videoElement"></video>
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	return { stream: state.streams[match.params.streamId] };
};

export default connect(mapStateToProps)(StreamShow);
