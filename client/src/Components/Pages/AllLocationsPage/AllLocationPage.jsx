import React from "react";
import { useParams } from "react-router-dom";
import AllLocations from "../../UserComponents/AllLocations/AllLocations";
// import UserFloors from "../../UserComponents/UserFloors/UserFloors";
import "./AllLocationPage.scss";

const AllLocationPage = () => {
	const { officeId } = useParams();
	const componentClass = "all-locations-page-container";

	return (
		<div className={componentClass}>
			{/* {!officeId ? <AllLocations /> : <UserFloors />} */}
		</div>
	);
};

export default AllLocationPage;
