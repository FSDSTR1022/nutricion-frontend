/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import moment from 'moment';
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
import { getAllUsers, getUserById } from '../../services/userService';

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
	/* 	const [idUserUS,setIdUserUS] = useState('') */
	const [localUserUS, setLocalUserUS] = useState({});

	const { id } = useParams();

	/* 	const user2 = localStorage.getItem('user');
	const userJSON = JSON.parse(user2)
 */
	/* 
	console.log("USER de localStorage: ",userJSON) */

	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user'));
		console.log('USER Local: ', localUser);
		setLocalUserUS(localUser);

		if (id !== undefined) {
			setPatient(id);
			getRoutines(id);
		} else {
			setPatient(localUser.id);
			getRoutines(localUser.id);
		}
	}, [openAlertUS, render]);

	async function setPatient(id) {
		console.log('USER BD: ', await getUserById(id));
		setPatientUS(await getUserById(id));
	}

	const getRoutines = async id => {
		const response = await getRutines();
		if (response.status === 200) {
			console.log(response);
			setRutinasListUS(response.data);

			const userRutines = response.data.filter(rut => rut.user._id === id);
			setUserRutinesListUS(userRutines);

			const events = [];
			// eslint-disable-next-line array-callback-return
			userRutines.map(ob => {
				const evento = {
					id: ob._id,
					title: ob.name,
					start: ob.day,
					allDay: true,
					editable: true,
				};

				if (ob.status === 'done') {
					evento.color = 'green';
				} else {
					evento.color = 'red';
				}

				if (localUserUS.type === 'profesional') {
					evento.editable = true;
				} else {
					evento.editable = false;
				}

				events.push(evento);
			});

			setEventsCalendar(events);

			const nextR = userRutines.filter(rut => Date.parse(rut.day) >= today);
			const nextRs = nextR.sort(
				(a, b) => Date.parse(a.day) - Date.parse(b.day)
			);
			setNextRutinasUS(nextRs);
		}
	};

	const handleEventClick = (id, day, e) => {
		setAccionEnDialogo('viewRutine');
		setDateSelectedUS(day);
		setRutineUS(id);
		setOpenRutineDialogUS(true);
	};

	const handleDateClick = date => {
		if (localUserUS.type === 'profesional') {
			setAccionEnDialogo('newRutine');
			setOpenRutineDialogUS(true);
			setDateSelectedUS(date);
		}
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

	// eslint-disable-next-line consistent-return
	function putDropEvent(id, date) {
		console.log('localUserUS.type: ', localUserUS.type);

		if (localUserUS.type === 'profesional') {
			const rutineUrl = `${process.env.REACT_APP_BACK_URL}rutines?id=`;

			return fetch(`${rutineUrl}${id}`, {
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ day: date }),
			})
				.then(res => res.json())
				.then(getRoutines(patientUS._id))
				.then(render ? setRender(false) : setRender(true))
				.catch(error => console.log('Error:', error));
		}
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

	const handleCloseMessage = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlertUS(false);
		}
		setOpenAlertUS(false);
	};

	return (
		<>
			<Helmet>
				<title> Health Guru | Paciente </title>
			</Helmet>

			<Container>
				{/* <Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				mb={5}>
				<Typography
					variant='h4'
					gutterBottom>
					Paciente: {`${patientUS.name} ${patientUS.lastName}`}
				</Typography>
			</Stack> */}

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
										variant='h5'
										textAlign='left'>
										Nombre: {patientUS.name}
									</Typography>

									<Typography
										variant='h5'
										textAlign='left'>
										{`Last Name: ${patientUS.lastName}`}
									</Typography>
									<Typography
										variant='h5'
										textAlign='left'>
										{`DNI: ${patientUS.dni}`}
									</Typography>
									<Typography
										variant='h5'
										textAlign='left'>
										{`Paciente desde: ${moment(patientUS.createdAt).format(
											'LL'
										)}`}
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
												variant='h5'
												textAlign='left'>
												{`Fecha:  ${moment(nextRutinasUS[0]?.day).calendar()}`}
											</Typography>
											<Typography
												variant='h5'
												textAlign='left'>
												{`Nombre: ${nextRutinasUS[0]?.name}`}
											</Typography>

											<Typography
												variant='h5'
												textAlign='left'>
												{`Rounds: ${nextRutinasUS[0]?.rounds.length}`}
											</Typography>
											<Typography
												variant='h5'
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

			{/*  ///////////////////// Dialogo mostrar rutina  /////////////////////  */}
			<Dialog
				open={openRutineDialogUS}
				onClose={handleCloseFormExerciseDialog}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				fullWidth
				maxWidth='l'>
				<DialogContent>
					<RutinePage
						action={accionEnDialogo}
						patien={patientUS}
						localUser={localUserUS}
						date={dateSelectedUS}
						routineId={rutineUS}
						setOpenRutineDialog={setOpenRutineDialogUS}
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
						Volver{' '}
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
