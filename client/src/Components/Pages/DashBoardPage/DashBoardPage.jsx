import "./DashBoardPage.scss";
import React from "react";
import DashboardMain from "../../DashboardComponents/DashBoardMain/DashboardMain";
import { useParams } from "react-router-dom";
import DashboardFloors from "../../DashboardComponents/DashboardFloors/DashboardFloors";

const DashBoardPage = () => {
	const { officeId } = useParams();
	const componentClass = "dashboard-page-container";
	const titleClass = `${componentClass}--title`;

	return (
		<div className={componentClass}>
			<h1 className={titleClass}>Welcome Admin!</h1>
			{!officeId ? <DashboardMain /> : <DashboardFloors />}
		</div>
	);
};

export default DashBoardPage;
