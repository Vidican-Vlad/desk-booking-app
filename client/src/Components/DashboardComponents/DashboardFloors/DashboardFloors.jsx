import "./DashboardFloors.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loadOfficeStateFail,
	loadOfficeStateInit,
	loadOfficeStateSuccess,
} from "../../../Redux/Features/officeDetailsSlice";
import { getFloors } from "../../../Redux/API/office";
import { Link, useParams } from "react-router-dom";

const DashboardFloors = () => {
	const dispatch = useDispatch();
	const { officeId } = useParams();
	useEffect(() => {
		const loadData = async () => {
			try {
				dispatch(loadOfficeStateInit());
				let res;
				if (officeId) {
					res = await getFloors(officeId);
				}
				if (!res) {
					dispatch(loadOfficeStateFail("Can't load Floors!"));
				} else {
					dispatch(loadOfficeStateSuccess(res));
				}
			} catch (error) {
				console.log(error);
				dispatch(loadOfficeStateFail(error.message));
			}
		};
		loadData();
	}, [dispatch, officeId]);
	const { office } = useSelector((state) => state.officeDetails);

	const componentClass = "dashboard-floors-container";
	const headerClass = `${componentClass}__header`;
	const floorsContainerClass = `${componentClass}__floors`;
	const floorClass = `${floorsContainerClass}__floor`;
	const btnContainerClass = `${floorClass}__btn`;
	return (
		<div className={componentClass}>
			<div className={headerClass}>
				<h1>{office && office.Name}</h1>
				<Link to={`/dashboard/office/${office._id}/new-floor`}>
					Add new Floor
				</Link>
			</div>
			<div className={floorsContainerClass}>
				{office &&
					office.floors &&
					office.floors.length > 0 &&
					office.floors.map((item) => {
						return (
							<div key={item._id} className={floorClass}>
								<h2>
									<span>Floor: </span> {item.Name}
								</h2>
								<div className={btnContainerClass}>
									<Link to={`/dashboard/office/${officeId}/floor/${item._id}`}>
										Show Floor
									</Link>
									<button>Delete Floor</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default DashboardFloors;
