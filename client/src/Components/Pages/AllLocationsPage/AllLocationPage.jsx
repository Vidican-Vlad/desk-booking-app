import React from "react";
import AllLocations from "../../UserComponents/AllLocations/AllLocations";
import "./AllLocationPage.scss";

const AllLocationPage = () => {
	const componentClass = "all-locations-page-container";

	return (
		<div className={componentClass}>
			<AllLocations />
		</div>
	);
};

export default AllLocationPage;
