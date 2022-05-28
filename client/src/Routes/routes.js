import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./routes.scss";
import Navbar from "../Components/Navigation/Navbar/Navbar";
import LandingPage from "../Components/Pages/LandingPage/LandingPage";
import LoginPage from "../Components/Pages/LoginPage/LoginPage";
import AdminRoute from "./AdminRoute";
import DashBoardPage from "../Components/Pages/DashBoardPage/DashBoardPage";

const WebRoutes = () => {
	const componentClass = "web-routes-container";
	return (
		<>
			<Router>
				<div className={componentClass}>
					<Navbar />
					<>
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route
								path="/dashboard"
								element={
									<AdminRoute>
										<DashBoardPage />
									</AdminRoute>
								}
							/>
						</Routes>
					</>
				</div>
			</Router>
		</>
	);
};

export default WebRoutes;
