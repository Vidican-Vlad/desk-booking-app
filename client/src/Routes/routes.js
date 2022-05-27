import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navigation/Navbar/Navbar";
import LandingPage from "../Components/Pages/LandingPage/LandingPage";

const WebRoutes = () => {
	return (
		<>
			<Router>
				<>
					<Navbar />
					<>
						<Routes>
							<Route path="/" element={<LandingPage />} />
						</Routes>
					</>
				</>
			</Router>
		</>
	);
};

export default WebRoutes;
