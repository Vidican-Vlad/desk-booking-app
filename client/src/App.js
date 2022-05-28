import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boolean } from "yup";
import "./App.scss";
import { loginSuccess } from "./Redux/Features/authenticationSlice";
import WebRoutes from "./Routes/routes";
import { TRUE } from "./Utils/constants";
import { getIsAdmin } from "./Utils/UtilFunctions";

function App() {
	const dispatch = useDispatch();
	const { isConnected } = useSelector((state) => state.auth);

	useEffect(() => {
		const loadData = async () => {
			try {
				if (isConnected) {
					dispatch(loginSuccess(getIsAdmin() === TRUE ? true : false));
				}
			} catch (error) {
				console.log(error);
			}
		};
		loadData();
	}, [isConnected, dispatch]);
	return <WebRoutes />;
}

export default App;
