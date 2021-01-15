import React from "react";
import { connect } from "react-redux";
const StreamEdit = ({ stream }) => {
	return (
		<div>
			<h1>StreamEdit: {stream.desc}</h1>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { stream: state.activeStream };
};
export default connect(mapStateToProps)(StreamEdit);
