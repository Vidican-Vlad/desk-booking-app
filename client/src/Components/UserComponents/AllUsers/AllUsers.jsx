import React, { useEffect } from "react";
import "./AllUsers.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	loadUsersFail,
	loadUsersInit,
	loadUsersSuccess,
} from "../../../Redux/Features/usersSlice";
import { getAllUsers } from "../../../Redux/API/user";

const AllUsers = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const loadData = async () => {
			try {
				dispatch(loadUsersInit());
				const res = await getAllUsers();
				if (!res) {
					dispatch(loadUsersFail("Can't load Users!"));
				} else {
					dispatch(loadUsersSuccess(res));
				}
			} catch (error) {
				console.log(error);
				dispatch(loadUsersFail(error.message));
			}
		};
		loadData();
	}, [dispatch]);

	const { users } = useSelector((state) => state.usersState);
	const componentClass = "all-users-container";

	console.log(users);

	return (
		<div className={componentClass}>
			<h2>All Users:</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Office</th>
						<th>Desk</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user) => {
							return (
								<tr key={user._id}>
									<td>
										{user?.firstName} {user.lastName}
									</td>
									<td>{user?.email}</td>
									<td>{user?.admin ? "Admin" : "User"}</td>
									<td>{user?.office?.Name}</td>
									<td>{user?.desk?.Name}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default AllUsers;
