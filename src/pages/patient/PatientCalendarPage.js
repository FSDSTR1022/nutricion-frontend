/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interaction from '@fullcalendar/interaction';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {
	Stack,
	Typography,
	Container,
	Card,
	DialogContent,
	Dialog,
	DialogActions,
	Button,
	Snackbar,
	Alert,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import RutinePage from '../rutine/RutinePage';
import { getRutines } from '../../services/routineService';
import { getAllUsers } from '../../services/userService';

const PatientCalendarPage = () => {
	/* todas las rutinas de la BD */
	const [rutinasListUS, setRutinasListUS] = useState([]);

	/* las rutinas de un paciente */
	const [userRutinesListUS, setUserRutinesListUS] = useState([]);

	const [rutineUS, setRutineUS] = useState({});
	const [openEventUS, setOpenEventUS] = useState(false);
	const [openRutineDialogUS, setOpenRutineDialogUS] = useState(false);
	const [actionUS, setActionUS] = useState('');
	const [dateSelectedUS, setDateSelectedUS] = useState(new Date());
	const [nextRutinasUS, setNextRutinasUS] = useState([]);

	const [patientUS, setPatientUS] = useState({});
	const [accionEnDialogo, setAccionEnDialogo] = useState('newRutine');
	const [eventsCalendar, setEventsCalendar] = useState();
	const [render, setRender] = useState(false);

	const [openAlertUS, setOpenAlertUS] = useState(false);
	const [messageAlertUS, setMessageAlertUS] = useState('');
	const [severityAlertUS, setSeverityAlertUS] = useState('success');

	const { id } = useParams();

	useEffect(() => {
		getAllusers();
		getRoutines();
	}, [openAlertUS, render]);

	const getRoutines = async () => {
		const response = await getRutines();
		if (response.status === 200) {
			setRutinasListUS(response.data);

			const userRutines = response.data.filter(rut => rut.user._id === id);
			setUserRutinesListUS(userRutines);

			const events = [];
			userRutines.map(ob =>
				events.push({
					id: ob._id,
					title: ob.name,
					start: ob.day,
					allDay: true,
					editable: true,
				})
			);
			setEventsCalendar(events);

			const nextR = userRutines.filter(rut => Date.parse(rut.day) >= today);
			const nextRs = nextR.sort(
				(a, b) => Date.parse(a.day) - Date.parse(b.day)
			);
			setNextRutinasUS(nextRs);
		}
	};

	const getAllusers = async () => {
		const response = await getAllUsers();
		if (response.status === 200) {
			const pat = response.data.filter(p => p._id === id).pop();
			setPatientUS(pat);
		}
	};

	const getPatients = () => {
		fetch('http://localhost:3000/users/all')
			.then(res => res.json())
			.then(data => {
				const pat = data.filter(p => p._id === id).pop();
				setPatientUS(pat);
			})
			.catch(err => console.log('error', err));
	};

	const handleEventClick = (id, day, e) => {
		setAccionEnDialogo('editRutine');
		setDateSelectedUS(day);
		setRutineUS(id);
		setOpenRutineDialogUS(true);

		/* 	const rutina = rutinasListUS.filter(e => e._id === id).pop();
		setRutinaUS(rutina);
		setActionUS('editRutine');
		setOpenEventUS(true); */
	};

	const handleDateClick = date => {
		console.log('date: ', date);
		setAccionEnDialogo('newRutine');
		setOpenRutineDialogUS(true);
		setDateSelectedUS(date);

		/* setDateNewRutinaUS(date);
		setActionUS('newRutine');
		setOpenRutinaDialogUS(true); */
	};

	const handleNewRutinaClose = () => {
		setOpenRutineDialogUS(false);
	};

	const today = Date.now() - 86400000;

	const handleNextRutines = async () => {
		const nextR = await rutinasListUS.filter(
			rut => Date.parse(rut.day) >= today
		);
		setNextRutinasUS(nextR);
	};

	function putDropEvent(id, date) {
		const rutineUrl = 'http://localhost:3000/rutines?id=';

		return fetch(`${rutineUrl}${id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ day: date }),
		})
			.then(res => res.json())
			.then(getRoutines())
			.then(render ? setRender(false) : setRender(true))
			.catch(error => console.log('Error:', error));
	}

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	const handleClickAceptButton = async event => {
		setOpenRutineDialogUS(false);
	};

	const handleClickCancelButton = async event => {
		setOpenRutineDialogUS(false);
	};

	const handleCloseFormExerciseDialog = evento => {
		setOpenRutineDialogUS(false);
	};

	const mostrar = evento => {
		/* console.log("Paciente US: ", patientUS)
		console.log("UserRutinesListUS: ", userRutinesListUS)
		console.log("nextRutinasUS: ", nextRutinasUS) */
		console.log('nextRutinasUS: ', render);
	};

	const handleCloseMessage = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlertUS(false);
		}
		setOpenAlertUS(false);
	};

	return (
		<>
			<Helmet>
				<title> Paciente </title>
			</Helmet>

			<Button
				value='cancelar'
				onClick={mostrar}>
				{' '}
				mostrar{' '}
			</Button>

			<Container>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					mb={5}>
					<Typography
						variant='h4'
						gutterBottom>
						Paciente: {`${patientUS.name} ${patientUS.lastName}`}
					</Typography>
				</Stack>

				<Card>
					<Box sx={{ flexGrow: 3 }}>
						<Grid
							container
							spacing={2}>
							<Grid xs={3}>
								<Item>
									<img
										style={{ borderRadius: '20px' }}
										src={patientUS.imgUrl}
										alt={patientUS.name}
									/>
								</Item>
							</Grid>
							<Grid xs={4}>
								<Item>
									<Typography
										variant='h3'
										textAlign='center'>
										Datos Paciente
									</Typography>
									<Typography
										variant='h4'
										textAlign='left'>
										Nombre: {patientUS.name}
									</Typography>

									<Typography
										variant='h4'
										textAlign='left'>
										{`Last Name: ${patientUS.lastName}`}
									</Typography>
									<Typography
										variant='h4'
										textAlign='left'>
										{`DNI: ${patientUS.dni}`}
									</Typography>
									<Typography
										variant='h4'
										textAlign='left'>
										{`Paciente desde: ${patientUS.createdAt}`}
									</Typography>
								</Item>
							</Grid>
							<Grid xs={4}>
								<Item>
									<Typography
										variant='h3'
										textAlign='center'>
										Próxima Rutina
									</Typography>
									{nextRutinasUS.length ? (
										<>
											<Typography
												variant='h4'
												textAlign='left'>
												{`Fecha:  ${nextRutinasUS[0]?.day}`}
											</Typography>
											<Typography
												variant='h4'
												textAlign='left'>
												{`Nombre: ${nextRutinasUS[0]?.name}`}
											</Typography>

											<Typography
												variant='h4'
												textAlign='left'>
												{`Rounds: ${nextRutinasUS[0]?.rounds.length}`}
											</Typography>
											<Typography
												variant='h4'
												textAlign='left'>
												{`Estimated time = ${
													nextRutinasUS[0]?.rounds.length * 12 + 8
												} minutes`}
											</Typography>
										</>
									) : (
										<Typography>No hay rutinas previstas</Typography>
									)}
								</Item>
							</Grid>
						</Grid>
					</Box>

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
						events={eventsCalendar}
						eventClick={info =>
							handleEventClick(info.event.id, info.event.startStr)
						}
						dateClick={info => handleDateClick(info.dateStr)}
						eventDrop={info => putDropEvent(info.event.id, info.event.start)}
					/>
				</Card>
			</Container>

			{/* ///////////////////// Dialogo mostrar rutina  ///////////////////// */}
			<Dialog
				open={openRutineDialogUS}
				onClose={handleCloseFormExerciseDialog}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				/* fullWidth="xl" */
				fullWidth
				maxWidth='l'>
				<DialogContent>
					<RutinePage
						action={accionEnDialogo}
						patien={patientUS}
						date={dateSelectedUS}
						routineId={rutineUS}
						setOpenDialog={setOpenRutineDialogUS}
						setMessageAlertUS={setMessageAlertUS}
						setOpenAlertUS={setOpenAlertUS}
						setSeverityAlertUS={setSeverityAlertUS}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						value='cancelar'
						onClick={handleClickCancelButton}>
						{' '}
						Cancelar{' '}
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={openAlertUS}
				autoHideDuration={6000}
				onClose={handleCloseMessage}>
				<Alert
					variant='filled'
					onClose={handleCloseMessage}
					severity={severityAlertUS}
					sx={{ width: '100%' }}>
					{messageAlertUS}
				</Alert>
			</Snackbar>
		</>
	);
};
export default PatientCalendarPage;
