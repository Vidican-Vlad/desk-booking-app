import "./DashBoardPage.scss";
import React from "react";
import DashboardMain from "../../DashboardComponents/DashBoardMain/DashboardMain";

const DashBoardPage = () => {
	const componentClass = "dashboard-page-container";
	const titleClass = `${componentClass}--title`;

	return (
		<div className={componentClass}>
			<h1 className={titleClass}>Welcome Admin!</h1>
			<DashboardMain />
		</div>
	);
};

export default DashBoardPage;
