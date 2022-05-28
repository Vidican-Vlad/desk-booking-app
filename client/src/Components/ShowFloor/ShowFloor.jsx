import "./ShowFloor.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	loadOfficeStateFail,
	loadOfficeStateInit,
	loadOfficeStateSuccess,
} from "../../Redux/Features/officeDetailsSlice";
import { getFloors } from "../../Redux/API/office";
import ImageMapper from "react-image-mapper";

const ShowFloor = () => {
	const { floorId, officeId } = useParams();
	const dispatch = useDispatch();
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
	const { floors } = useSelector((state) => state.officeDetails).office;
	const floor = floors && floors.filter((item) => item._id === floorId);

	const MAP = {
		name: "my-map",
		areas: [
			{
				name: "1",
				shape: "poly",
				coords: [25, 33, 27, 300, 128, 240, 128, 94],
				preFillColor: "green",
				fillColor: "blue",
			},
			{
				name: "2",
				shape: "poly",
				coords: [219, 118, 220, 210, 283, 210, 284, 119],
				preFillColor: "pink",
			},
			{
				name: "3",
				shape: "poly",
				coords: [381, 241, 383, 94, 462, 53, 457, 282],
				fillColor: "yellow",
			},
			{
				name: "4",
				shape: "poly",
				coords: [245, 285, 290, 285, 274, 239, 249, 238],
				preFillColor: "red",
			},
			{ name: "5", shape: "circle", coords: [170, 100, 25] },
		],
	};
	console.log(floor[0]);
	return (
		<div>
			{/* {floor && floor.length && <img src={floor[0]?.Image} alt="map" />} */}
			<ImageMapper
				src={floor[0].Image}
				map={MAP}
				// width={500}
				// onLoad={() => this.load()}
				// onClick={(area) => this.clicked(area)}
				// onMouseEnter={(area) => this.enterArea(area)}
				// onMouseLeave={(area) => this.leaveArea(area)}
				// onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
				// onImageClick={(evt) => this.clickedOutside(evt)}
				// onImageMouseMove={(evt) => this.moveOnImage(evt)}
			/>
		</div>
	);
};

export default ShowFloor;
