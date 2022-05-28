import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { getUserById } from "./Redux/API/user";
import { loginSuccess } from "./Redux/Features/authenticationSlice";
import {
	loadProfileFail,
	loadProfileInit,
	loadProfileSuccess,
} from "./Redux/Features/profileSlice";
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
					dispatch(
						loginSuccess(getIsAdmin() === TRUE ? true : false),
					);
					dispatch(loadProfileInit());
					const user = await getUserById();
					if (!user) {
						dispatch(loadProfileFail("User not found"));
					} else {
						dispatch(loadProfileSuccess(user));
					}
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
