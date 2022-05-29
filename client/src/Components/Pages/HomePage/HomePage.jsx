import "./HomePage.scss";
import React from "react";
import { Home } from "../../UserComponents/Home/Home";

const HomePage = () => {
	const componentClass = "home-page-container";
	return (
		<div className={componentClass}>
			<Home />
		</div>
	);
};

export default HomePage;
