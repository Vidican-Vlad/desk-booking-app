import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./routes.scss";
import Navbar from "../Components/Navigation/Navbar/Navbar";
import HomePage from "../Components/Pages/HomePage/HomePage";
import LoginPage from "../Components/Pages/LoginPage/LoginPage";
import AdminRoute from "./AdminRoute";
import DashBoardPage from "../Components/Pages/DashBoardPage/DashBoardPage";
import ProfilePage from "../Components/Pages/ProfilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import CreateAccountsPage from "../Components/Pages/CreateAccountPage/CreateAccountsPage";
import PageNotFound from "../Components/Pages/PageNotFound/PageNotFound";
import AllLocationPage from "../Components/Pages/AllLocationsPage/AllLocationPage";
import CreateOfficePage from "../Components/Pages/CreateOfficePage/CreateOfficePage";
import CreateFloorPage from "../Components/Pages/CreateFloorPage/CreateFloorPage";
import ShowFloorPage from "../Components/Pages/ShowFloorPage/ShowFloorPage";
import AllUsersPage from "../Components/Pages/AllUsersPage/AllUsersPage";
import ResetPasswordPage from "../Components/Pages/ResetPasswordPage/ResetPasswordPage";

const WebRoutes = () => {
	const componentClass = "web-routes-container";
	return (
		<>
			<Router>
				<div className={componentClass}>
					<Navbar />
					<>
						<Routes>
							<Route path="/" element={<HomePage />} />
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
								path="/dashboard/office/:officeId"
								element={
									<AdminRoute>
										<DashBoardPage />
									</AdminRoute>
								}
							/>
							<Route
								path="/dashboard/office/:officeId/new-floor"
								element={
									<AdminRoute>
										<CreateFloorPage />
									</AdminRoute>
								}
							/>
							<Route
								path="/dashboard/office/:officeId/floor/:floorId"
								element={
									<AdminRoute>
										<ShowFloorPage />
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
								path="/create-office"
								element={
									<AdminRoute>
										<CreateOfficePage />
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
							<Route
								path="/all-locations"
								element={
									<PrivateRoute>
										<AllLocationPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/all-users"
								element={
									<PrivateRoute>
										<AllUsersPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/reset-password"
								element={
									<PrivateRoute>
										<ResetPasswordPage />
									</PrivateRoute>
								}
							/>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</>
				</div>
			</Router>
		</>
	);
};

export default WebRoutes;
