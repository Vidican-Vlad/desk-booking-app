import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./routes.scss";
import Navbar from "../Components/Navigation/Navbar/Navbar";
import LandingPage from "../Components/Pages/LandingPage/LandingPage";
import LoginPage from "../Components/Pages/LoginPage/LoginPage";
import AdminRoute from "./AdminRoute";
import DashBoardPage from "../Components/Pages/DashBoardPage/DashBoardPage";
import ProfilePage from "../Components/Pages/ProfilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import CreateAccountsPage from "../Components/Pages/CreateAccountPage/CreateAccountsPage";

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
							<Route
								path="/create-account"
								element={
									<AdminRoute>
										<CreateAccountsPage />
									</AdminRoute>
								}
							/>
							<Route
								path="/profile"
								element={
									<PrivateRoute>
										<ProfilePage />
									</PrivateRoute>
								}
							/>
							<Route path="*" element={<div>404</div>} />
						</Routes>
					</>
				</div>
			</Router>
		</>
	);
};

export default WebRoutes;
