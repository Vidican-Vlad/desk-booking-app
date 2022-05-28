import "./ShowFloorPage.scss";
import React from "react";
import ShowFloor from "../../ShowFloor/ShowFloor";

const ShowFloorPage = () => {
	const componentClass = "show-floor-page-container";
	return (
		<div className={componentClass}>
			<ShowFloor />
		</div>
	);
};

export default ShowFloorPage;
