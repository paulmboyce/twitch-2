import React from "react";
import { connect } from "react-redux";

const ErrorHeader = ({ error }) => {
	if (error) {
		return (
			<div className="ui negative message">
				<div className="header">Something went wrong... </div>
				<p>{error}</p>
			</div>
		);
	}
	return null;
};

const mapStateToProps = (state) => {
	return { error: state.error };
};
export default connect(mapStateToProps)(ErrorHeader);
