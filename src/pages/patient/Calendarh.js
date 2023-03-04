import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
// import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interaction from '@fullcalendar/interaction';
// import { formatRange } from "@fullcalendar/core";
// import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PopRutina from './PopRutina';
import NewRutina from './NewRutina';

// import moment from "moment";

// const localizer = momentLocalizer(moment); // or globalizeLocalizer

const rutineUrl = 'http://localhost:3000/rutines?id=';

const patientExample = {
	_id: '63fa12a0e716c52f3d4274ad',
	email: 'federicogomdyezz.ar@gmail.com',
	password: '',
	name: 'Toto',
	lastName: 'Wolf',
	dni: 'Y12345S',
	phone: '1234556678',
	isActive: true,
	imgUrl:
		'https://res.cloudinary.com/dtnuuoiih/image/upload/v1677779479/toto_vpt9uo.jpg',
	createdAt: '2023-02-25T13:52:32.403Z',
	updatedAt: '2023-02-25T14:18:28.357Z',
	__v: 0,
	userType: 'patient',
	professional: '63d1b05e3848057c6b281253',
};

const Calendarh = () => {
	const [rutinasList, setRutinasList] = useState([]);
	const [rutina, setRutina] = useState({});
	const [openEvent, setOpenEvent] = useState(false);
	const [openNewRutina, setOpenNewRutina] = useState(false);
	const [action, setAction] = useState('');
	const [dateNewRutina, setDateNewRutina] = useState(new Date());
	const [nextRutinas, setNextRutinas] = useState([]);

	const state = useParams();

	useEffect(() => {
		getMeassures();
		console.log(JSON.stringify(state));
	}, []);

	const getMeassures = () => {
		fetch('http://localhost:3000/rutines/')
			.then(res => res.json())
			.then(data => {
				setRutinasList(data);
				const nextR = data.filter(rut => Date.parse(rut.day) >= today);
				const nextRs = nextR.sort(
					(a, b) => Date.parse(a.day) - Date.parse(b.day)
				);

				setNextRutinas(nextRs);
			})

			.catch(err => console.log('error', err));
		handleNextRutines();
	};

	const today = Date.now() - 86400000;

	// console.log('el state es', props);

	const events = [];
	rutinasList.map(ob =>
		events.push({
			id: ob._id,
			title: ob.name,
			start: ob.day,
			allDay: true,
			editable: true,
		})
	);

	const handleEventClick = id => {
		const rutina = rutinasList.filter(e => e._id === id).pop();
		setRutina(rutina);
		setAction('editRutine');
		setOpenEvent(true);
	};

	const handleEventClose = () => {
		setOpenEvent(false);
		setRutina({});
	};

	const handleDateClick = date => {
		setDateNewRutina(date);
		setAction('newRutine');
		setOpenNewRutina(true);
	};

	const handleNewRutinaClose = () => {
		setOpenNewRutina(false);
	};

	const handleNextRutines = async () => {
		const nextR = await rutinasList.filter(rut => Date.parse(rut.day) >= today);

		console.log('array de proximas', nextR);
		setNextRutinas(nextR);
	};

	function putDropEvent(id, date) {
		return fetch(`${rutineUrl}${id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ day: date }),
		})
			.then(res => res.json())
			.then(getMeassures())

			.catch(error => console.log('Error:', error));
	}

	return (
		<>
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs={4}>
					<Stack spacing={4}>
						<img
							src={patientExample.imgUrl}
							alt={patientExample.name}
						/>
						<Typography
							variant='h2'
							textAlign='center'>
							{patientExample.name}
						</Typography>
						<Typography
							variant='h4'
							sx={{ justifyContent: 'space' }}>
							{`Last Name: ${patientExample.lastName}`}
						</Typography>
						<Typography variant='h4'>{`DNI: ${patientExample.dni}`}</Typography>
						<Typography variant='h4'>
							{`Paciente desde: ${patientExample.createdAt}`}
						</Typography>
						<Typography
							variant='h3'
							textAlign='center'>
							{`Próxima Rutina`}
						</Typography>
						<Typography
							variant='h4'
							textAlign='left'>
							{`Nombre: ${nextRutinas[0]?.name}`}
						</Typography>
						<Typography
							variant='h4'
							textAlign='left'>
							{`Fecha:  ${nextRutinas[0]?.day}`}
						</Typography>
						<Typography
							variant='h4'
							textAlign='left'>
							{`Rounds: ${nextRutinas[0]?.rounds.length}`}
						</Typography>
						<Typography
							variant='h4'
							textAlign='left'>
							{`Estimated time = ${
								nextRutinas[0]?.rounds.length * 12 + 8
							} minutes`}
						</Typography>
					</Stack>
				</Grid>
				<Grid
					item
					xs={8}>
					<FullCalendar
						plugins={[dayGridPlugin, interaction, timeGridPlugin, listPlugin]}
						headerToolbar={{
							start: 'today',
							center: 'title',
							end: 'prev,next',
						}}
						height={'85vh'}
						initialView='dayGridMonth'
						editable='true'
						events={events}
						eventClick={info => handleEventClick(info.event.id)}
						dateClick={info => handleDateClick(info.dateStr)}
						eventDrop={info => putDropEvent(info.event.id, info.event.start)}
					/>
				</Grid>
			</Grid>

			<PopRutina
				handleEventClose={handleEventClose}
				action={action}
				openEvent={openEvent}
				rutina={rutina}
			/>
			<NewRutina
				handleNewRutinaClose={handleNewRutinaClose}
				action={action}
				openNewRutina={openNewRutina}
				dateNewRutina={dateNewRutina}
			/>
		</>
	);
};

export default Calendarh;
