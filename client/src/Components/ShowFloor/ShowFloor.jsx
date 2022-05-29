import "./ShowFloor.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { getFloor, bookDesk } from "../../Redux/API/office";
import ImageMapper from "react-image-mapper";
import {
	loadFloorInit,
	loadFloorFail,
	loadFloorSuccess,
} from "../../Redux/Features/floorSlice";
import {
	bookInit,
	bookFail,
	bookSuccess,
} from "../../Redux/Features/deskSlice";
import { Formik, Form } from "formik";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

const ShowFloor = () => {
	const { floorId, officeId } = useParams();
	const dispatch = useDispatch();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [desk, setDesk] = useState({});
	const [deskId, setDeskId] = useState();
	const [startDate, setStartDate] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		const loadData = async () => {
			try {
				dispatch(loadFloorInit());
				let res;
				if (officeId) {
					res = await getFloor(floorId);
				}
				if (!res) {
					dispatch(loadFloorFail("Can't load Floor!"));
				} else {
					dispatch(loadFloorSuccess(res));
				}
			} catch (error) {
				console.log(error);
				dispatch(loadFloorFail(error.message));
			}
		};
		loadData();
	}, [dispatch, floorId, officeId]);

	const { floor } = useSelector((state) => state.floorState);
	const areas = floor.areas
		? floor.areas.map((area) => {
				return {
					name: area.name,
					shape: area.shape,
					coords: area.coords.map(Number),
					preFillColor: area.Bookable ? "green" : "red",
					bookable: area.Bookable,
					id: area._id,
				};
		  })
		: [];

	const submitHandler = async () => {
		dispatch(bookInit());
		try {
			const bookValues = {
				_id: deskId,
				date: startDate,
			};

			const res = await bookDesk(bookValues);
			console.log(res);
			if (!res) {
				dispatch(bookFail("Can`t book desk!"));
			} else {
				dispatch(bookSuccess());
				navigate("/");
			}
		} catch (error) {
			dispatch(bookFail(error.message));
		}
	};
	const dateHandler = (e) => {
		setStartDate(e.target.value);
	};

	function onClick(e) {
		if (e.bookable) {
			setDeskId(e.id);
			areas.map((area) => {
				if (area.id === deskId) {
					setDesk(area);
				}
			});
			console.log(desk);
			openModal();
		} else {
			console.log("Not Bookable");
		}
	}

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const MAP = {
		name: "my-map",
		areas: areas,
	};
	return (
		<div>
			<ImageMapper
				src={floor.Image}
				map={MAP}
				width={1000}
				onClick={(area) => onClick(area)}
			/>
			<div>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<h2>{desk?.name}</h2>
					<Formik
						initialValues={{
							date: startDate,
						}}
						onSubmit={(values) => {
							submitHandler();
						}}
					>
						<Form>
							<input
								onChange={dateHandler}
								type="date"
								name="date"
								id="date"
							/>
							<button type="submit">Book</button>
						</Form>
					</Formik>
				</Modal>
			</div>
		</div>
	);
};

export default ShowFloor;
