import "./Home.scss";
import React from "react";
import { Link } from "react-router-dom";
import WelcomeImg from "../../../Assets/Images/WelcomeImg.svg";
import { useSelector } from "react-redux";

const componentClass = "home-container";
const dataClass = `${componentClass}__data`;

export const Home = () => {
	const { userProfile } = useSelector((state) => state.profileSlice);
	console.log(userProfile.initialPass);
	return (
		<div className={componentClass}>
			<div className={dataClass}>
				<div>
					<img src={WelcomeImg} alt="welcome-svg" />
				</div>
				{userProfile && userProfile.initialPass && (
					<p>
						If is the first time when you login, plese reset your password{" "}
						<Link to="/reset-password">HERE</Link>
					</p>
				)}
			</div>
		</div>
	);
};
