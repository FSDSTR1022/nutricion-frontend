/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// @mui
import {
	Card,
	Stack,
	Container,
	Typography,
	Accordion,
	AccordionSummary,
	Box,
	TextField,
	InputAdornment,
	AccordionDetails,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
	FormControl,
	IconButton,
	Popover,
	MenuItem,
	Grid,
	Item,
	Rating,
	InputLabel,
	Select,
	SelectChangeEvent
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../components/iconify';
import {
	saveRutine,
	getRutineById,
	deleteRutine,
	updateRutine,
} from '../../services/routineService';

import PatientPage from '../patient/PatientPage';
import FormExercise from '../exercise/NewExercisePage';
import ExerciseListPage from '../exercise/ExerciseListPage';

export default function RutinePage(props) {
	const [isLoading, setIsLoading] = useState(true);

	const [accordionExpanded, setAccordionExpanded] = useState(false);
	const [rutineUS, setRutineUS] = useState({
		name: '',
		patient: '',
		day: '',
		rounds: [],
	});
	const [roundToEdit, setRoundToEdit] = useState('');
	const [roundNameToEdit, setRoundNameToEdit] = useState('');

	const [openSelectExerciseDialog, setOpenSelectExerciseDialog] =
		useState(false);
	const [openViewExerciseDialog, setOpenViewExerciseDialog] = useState(false);
	const [errorTextFild, setErrorTextFild] = useState(false);

	const [exerciseToAddUS, setExerciseToAddUS] = useState([]);
	const [
		roundDondeSeAgregaraElEjercicioUS,
		SetRoundDondeSeAgregaraElEjercicioUS,
	] = useState('');

	const [patientToAddUS, setPatientToAddUS] = useState([]);
	const [openSelectPatientDialog, setOpenSelectPatientDialog] = useState('');

	const [rutineNameUS, setRutineNameUS] = useState('');
	const [patientUS, setPatientUS] = useState();
	const [rutineDateUS, setRutineDateUS] = useState('2023-02-03');
	const [valueDay, setValueDay] = useState(null);

	const [errorsUS, setErrorsUS] = useState({});

	const [openConfirmationUS, setOpenConfirmationUS] = useState(false);
	const [confirmationAcionUS, setConfirmationAcionUS] = useState('');

	const [actionUS, setActionUS] = useState();

	const [exerciseToViewUS, setExerciseToViewUS] = useState('');
	const [actionToDoInexerciseDialogUS, setActionToDoInexerciseDialogUS] =
		useState();
	const [openFormDialogUS, setOpenFormDialogUS] = useState(false);

	const [esValido, setEsValido] = useState(false);
	const [openPopoverExerciseUS, setOpenPopoverExerciseUS] = useState(null);
	const [openPopoverRutineUS, setOpenPopoverRutineUS] = useState(null);
	const [localUserUS, setLocalUserUS] = useState({});

	const [openFeedbackDialog,setOpenFeedbackDialog] = useState(false)
	const [startFeedbackUS, setStartFeedbackUS] = useState("1");
	 const[textFeedbackUS, setTextFeedbackUS] = useState('');

	const navigate = useNavigate();

	const {
		action,
		patien,
		localUser,
		date,
		routineId,
		setOpenDialog,
		setMessageAlertUS,
		setOpenAlertUS,
		setSeverityAlertUS,
	} = props;

	/* 	const theme = useTheme(); */

	useEffect(() => {
		console.log('PROPS:', props);
		setLocalUserUS(localUser)

		switch (action) {
			case undefined:
			case 'newRutine':
				setActionUS(action);
				setPatientUS(patien);
				setRutineDateUS(date);
				setIsLoading(false);

				break;
			case 'viewRutine':
				setActionUS('viewRutine');
				setPatientUS(patien);
				setRutineDateUS(date);
				// eslint-disable-next-line no-case-declarations
				const getExe1 = async () => {
					const response = await getRutineById(routineId);
					if (response.status === 200) {
						setRutineUS(response.data[0]);
						setPatientUS(response.data[0].user);
						setRutineNameUS(response.data[0].name);
					}
				};
				getExe1();
				setIsLoading(false);
				break;

			case 'editRutine':
				setActionUS('editRutine');
				setPatientUS(patien);
				setRutineDateUS(date);

				// eslint-disable-next-line no-case-declarations
				const getExe = async () => {
					const response = await getRutineById(routineId);
					if (response.status === 200) {
						setRutineUS(response.data[0]);
						setPatientUS(response.data[0].user);
						setRutineNameUS(response.data[0].name);
					}
				};
				getExe();

				setIsLoading(false);
				break;
			default:
				break;
		}
	}, []);

	const handleClosePopoverExercise = () => {
		setOpenPopoverExerciseUS(null);
	};

	const handleClosePopoverRutine = () => {
		setOpenPopoverRutineUS(null);
	};

	const handleOpenMenuExercise = id => event => {
		setOpenPopoverExerciseUS({ _id: id, target: event.currentTarget });
	};

	const handleOpenMenuRutine = id => event => {
		setOpenPopoverRutineUS({ target: event.currentTarget });
	};

	const handleChangeAcordion = roundOrder => (event, isExpanded) => {
		if (roundOrder === 'addRound') {
			const { rounds } = rutineUS;

			rounds.push({
				order: rounds.length + 1,
				roundName: `${rounds.length + 1}`,
				exercises: [],
			});

			setRutineUS(rutineUS => ({
				...rutineUS,
				rounds,
			}));

			setErrorsUS(errorsUS => ({
				...errorsUS,
				roundsRutine: false,
			}));
		}

		setAccordionExpanded(isExpanded ? roundOrder : false);
	};

	const handleChangeRutineNameTextField = event => {
		setRutineNameUS(event.target.value);
		setErrorsUS(errorsUS => ({
			...errorsUS,
			rutineName: false,
		}));
	};

	const handleChangePacienteNameTextField = event => {
		setPatientUS(pacientUS => ({
			...pacientUS,
			pacientName: event.target.value,
		}));

		setErrorsUS(errorsUS => ({
			...errorsUS,
			pacientName: false,
		}));
	};

	const handleChangeRutineDayTextField = event => {
		setRutineDateUS(event.target.value);
		setErrorsUS(errorsUS => ({
			...errorsUS,
			rutineDay: false,
		}));
	};

	const handleClickAddExceciseIcon = round => event => {
		SetRoundDondeSeAgregaraElEjercicioUS(round);
		setOpenSelectExerciseDialog(true);
	};

	const handleClickEditExceciseIcon = (roundOrder, excersiceId) => event => {
		console.log(
			'Click EDIT exercise ICON ///////////////////////////////////777777777777/'
		);
	};

	const handleClickDeleteExceciseIcon = (roundOrder, excersiceId) => event => {
		setRoundToEdit(roundOrder);
		setExerciseToViewUS(excersiceId);
		setConfirmationAcionUS('deleteExercise');
		setOpenConfirmationUS(true);
	};

	const handleClickDeleteRoundIcon = roundOrder => event => {
		setOpenConfirmationUS(true);
		setConfirmationAcionUS('deleteRound');
	};

	const deleteRound = () => {
		const { rounds } = rutineUS;

		const index = rounds.findIndex(element => element.order === roundToEdit);

		rounds.splice(index, 1);

		let order = 1;
		rounds.map(round => {
			round.order = order;
			order++;
		});

		setRutineUS(rutineUS => ({
			...rutineUS,
			rounds,
		}));
	};

	const deleteExercise = () => {
		const { rounds } = rutineUS;

		const indexRound = rounds.findIndex(
			element => element.order === roundToEdit
		);

		const indexExercise = rounds[indexRound].exercises.findIndex(
			exercise => exercise._id === exerciseToViewUS
		);

		rounds[indexRound].exercises.splice(indexExercise, 1);

		setRutineUS(rutineUS => ({
			...rutineUS,
			rounds,
		}));
	};

	const deleteRutinee = async () => {
		console.log('Borrar rutina: ', rutineUS._id);

		const response = await deleteRutine(rutineUS);

		if (response.status === 200) {
			console.log('Se elimino la rutina');
			setMessageAlertUS('Se elimino la rutina');
			setSeverityAlertUS('success');
			setOpenAlertUS(true);
			setOpenDialog(false);
		} else {
			console.log('NO Se elimino la rutina');
		}
	};

	const handleOnChangeRoundNameTextField = (roundOrder, roundName) => event => {
		setRoundNameToEdit(event.target.value);
	};

	const handleKeyDonwRoundNameTextFiled = roundOrder => event => {
		if (event.key === 'Enter') {
			const { rounds } = rutineUS;
			rounds.map(round => {
				if (round.order === roundOrder) {
					round.roundName = roundNameToEdit;
				}
				return true;
			});

			setRoundToEdit('');
			setRoundNameToEdit('');
		} else if (event.key === 'Escape') {
			setRoundToEdit('');
			setRoundNameToEdit('');
		}
	};

	const handleOnClickEditRoundNameIcon = (roundOrder, roundName) => event => {
		setRoundToEdit(roundOrder);
		setRoundNameToEdit(roundName);
	};

	const handleOnClickAcceptRoundNameChange = roundOrder => {
		const { rounds } = rutineUS;
		rounds.map(round => {
			if (round.order === roundOrder) {
				round.roundName = roundNameToEdit;
			}
			return true;
		});

		setRoundToEdit('');
		setRoundNameToEdit('');
	};

	const handleOnClickAceptDialogButons = event => {
		if (event.target.value === 'aceptar') {
			switch (confirmationAcionUS) {
				case 'deleteRound':
					deleteRound();
					break;
				case 'deleteExercise':
					deleteExercise();
					break;
				case 'deleteRutine':
					deleteRutinee();
					break;
				default:
					break;
			}
			setOpenConfirmationUS(false);
			setConfirmationAcionUS('');
			setRoundToEdit('');
		} else if (event.target.value === 'cancelar') {
			setExerciseToViewUS();
			setOpenConfirmationUS(false);
			setConfirmationAcionUS('');
		}
	};

	const handleClickAddExerciseButton = () => {
		const rutina = rutineUS;
		const round = rutina.rounds.find(
			round => round.roundName === roundDondeSeAgregaraElEjercicioUS
		);

		round.exercises = round.exercises.concat(exerciseToAddUS);

		setExerciseToAddUS([]);
		SetRoundDondeSeAgregaraElEjercicioUS('');
		setOpenSelectExerciseDialog(false);
	};

	const handleClickAddPatientButton = () => {
		setOpenSelectPatientDialog(true);
	};

	const handleCloseDialog = () => {
		setExerciseToAddUS([]);
		setOpenSelectExerciseDialog(false);

		setPatientToAddUS([]);
		setOpenSelectPatientDialog(false);

		setExerciseToAddUS([]);
		setOpenViewExerciseDialog(false);

		setOpenFeedbackDialog(false)
	};

	const handleClickShowexerciseButton = () => {
		console.log('Ejercicios a agregar: ', exerciseToAddUS);
	};

	const handleClickShowRutineButton = () => {
		console.log('rutineUS: ', rutineUS);
	};

	const handleClickAddpatientButton = () => {
		console.log('seleccionar paciente');
	};

	const handleClickViewExercise = (event, id, roundOrder) => {
		const round = rutineUS.rounds.find(round => round.order === roundOrder);
		const detalleEjercicio = round.exercises.find(
			exe => exe.exercise._id === id
		);

		setActionToDoInexerciseDialogUS('viewExercise');
		setExerciseToViewUS(detalleEjercicio.exercise);
		setOpenViewExerciseDialog(true);
		setOpenPopoverExerciseUS(null);
	};

	const handleClickEditExercise = (event, id) => {
		console.log('editar ejericico');
		/* const excersiceToEdit = exerciseListUS.find(element => element._id === id);

		setActionToDoInexerciseDialogUS('editExercise');
		setExerciseToDeleteOrEditUS(excersiceToEdit);
		setOpenFormDialogUS(true);
		setOpenUS(null); */
	};

	const handleClickDelteExercise = (event, id, roundOrder) => {
		console.log('eliminar ejericico');
		setRoundToEdit(roundOrder);
		setExerciseToViewUS(id);
		setConfirmationAcionUS('deleteExercise');
		setOpenConfirmationUS(true);
		setOpenPopoverExerciseUS(null);
	};

	const handleClickEditRutine = () => {
		setActionUS('editRutine');
		setOpenPopoverRutineUS(null);
	};

	const handleClickDelteRutine = () => {
		setConfirmationAcionUS('deleteRutine');
		setOpenConfirmationUS(true);
		setOpenPopoverRutineUS(null);
	};

	const handleClickSaveRutineButton = () => {
		if (checkForm()) {
			console.log('GUARDAR RUTINA');

			const rutineToSave = {};

			/* rutineToSave.rounds = rutineUS.rounds;

			rutineToSave.rounds.map(round => {
				if (round.exercises.length > 0) {
					round?.exercises.map(e => {
						e.exercise = e._id;
					});
				}
			}); */

			const roundModificados = rutineUS.rounds;

			roundModificados.map(round => {
				if (round.exercises.length > 0) {
					round.exercises.map(de => de.exercise._id);
				}
			});

			console.log('roundModificados: ', roundModificados);

			rutineToSave.rounds = roundModificados;

			rutineToSave.name = rutineNameUS;
			rutineToSave.day = rutineDateUS;
			rutineToSave.user = patientUS._id;
			rutineToSave.status="pending";

			console.log('Rutina a guardar: ', rutineToSave);

			if (actionUS === 'newRutine') {
				saveRutine(rutineToSave).then(response => {
					if (response.status === 200) {
						console.log('SE GUARDO CON EXITO');
						setOpenDialog(false);
						setIsLoading(true);
						setMessageAlertUS(`Se creo la rutina para el dia ${date}`);
						setOpenAlertUS(true);
						setSeverityAlertUS('success');
					} else {
						console.log('NO SE GUARDO CON EXITO');
						console.log('response: ', response);
					}
				});
			} else if (actionUS === 'editRutine') {
				rutineToSave._id = rutineUS._id;
				updateRutine(rutineToSave).then(response => {
					if (response.status === 200) {
						console.log('SE Edito CON EXITO');
						setOpenDialog(false);
						setIsLoading(true);
						setMessageAlertUS(`Se modific?? la rutina`);
						setOpenAlertUS(true);
						setSeverityAlertUS('success');
					} else {
						console.log('NO SE GUARDO CON EXITO');
						console.log('response: ', response);
					}
				});
			}
		}
	};

	const checkForm = () => {
		let errors = true;

		/* 		if (pacientUS.name === undefined || pacientUS.name === '') {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				pacientName: true,
			}));

			errors = false;
		} */

		if (rutineNameUS === undefined || rutineNameUS === '') {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				rutineName: true,
			}));

			errors = false;
		}

		if (rutineDateUS === undefined || rutineDateUS === '') {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				rutineDay: true,
			}));

			errors = false;
		}

		if (rutineUS.rounds.length === 0) {
			console.log('roundsRutine');
			setErrorsUS(errorsUS => ({
				...errorsUS,
				roundsRutine: true,
			}));

			errors = false;
		}

		/* if (rutineUS.rounds.length === 0) {
			console.log('roundsRutine');
			setErrorsUS(errorsUS => ({
				...errorsUS,
				roundsRutine: true,
			}));

			errors = false;
		} */

		return errors;
	};

	const mostrarDay = () => {
		console.log(valueDay);
		console.log(valueDay.$D);
	};

	const handleOnClickEditRoutine = para => event => {
		console.log('Editar rutina: ', para);
	};

	const handleClickDeleteRutine = para => event => {
		console.log('delete rutina', para);
	};

	const getAccordions = round => {
		const RoundAcordions = (
			<>
				<Accordion
					key={round.order}
					expanded={accordionExpanded === round.order}
					onChange={handleChangeAcordion(round.order)}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1bh-content'
						id='panel1bh-header'>
						{roundToEdit !== round.order ? (
							<Typography sx={{ width: '33%', flexShrink: 0 }}>
								{`Round ${round.roundName}`}
							</Typography>
						) : (
							<>
								<Box
									sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
									noValidate
									autoComplete='off'
									margin='dense'>
									<TextField
										id='standard-basic'
										label='Nombre Round'
										variant='standard'
										size='small'
										value={roundNameToEdit}
										error={errorTextFild}
										onChange={handleOnChangeRoundNameTextField(
											round.order,
											round.roundName
										)}
										onKeyDown={handleKeyDonwRoundNameTextFiled(round.order)}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<CheckIcon
														color='success'
														onClick={() => {
															handleOnClickAcceptRoundNameChange(round.order);
														}}
													/>
												</InputAdornment>
											),
										}}
									/>
								</Box>
							</>
						)}
					</AccordionSummary>
					<AccordionDetails>
						{actionUS !== 'viewRutine' ? (
							<div style={{ display: 'flex', justifyContent: 'end' }}>
								<DeleteIcon onClick={handleClickDeleteRoundIcon(round.order)} />
								<EditIcon
									onClick={handleOnClickEditRoundNameIcon(
										round.order,
										round.roundName
									)}
								/>
							</div>
						) : (
							<></>
						)}

						<Table
							sx={{ minWidth: 650 }}
							aria-label='simple table'>
							{round.exercises.length > 0 ? (
								<TableHead>
									<TableRow>
										<TableCell align='center'>Nombre Ejercicio</TableCell>
										<TableCell align='center'>Tiempo / repeticiones </TableCell>
										<TableCell align='center'>Elementos </TableCell>
										<TableCell align='center' />
									</TableRow>
								</TableHead>
							) : null}
							<TableBody>
								{round.exercises !== undefined
									? round.exercises.map(exercise => (
											<>
												<TableRow
													key={exercise.exercise._id}
													hover
													sx={{
														'&:last-child td, &:last-child th': { border: 0 },
													}}>
													<TableCell
														component='th'
														scope='row'
														align='center'>
														{exercise.exercise.name}
													</TableCell>
													<TableCell
														component='th'
														scope='row'
														align='center'>
														{exercise.timeOReps}
													</TableCell>
													<TableCell
														component='th'
														scope='row'
														align='center'>
														<Box
															sx={{
																display: 'flex',
																flexWrap: 'wrap',
																justifyContent: 'center',
																gap: 0.5,
															}}>
															{exercise.exercise.equipments.map(equipment => (
																<Chip
																	key={equipment._id}
																	label={equipment.exerciseEquipment}
																/>
															))}
														</Box>
													</TableCell>
													<TableCell align='right'>
														<IconButton
															size='large'
															color='inherit'
															onClick={handleOpenMenuExercise(
																exercise.exercise._id
															)}>
															<Iconify icon={'eva:more-vertical-fill'} />
														</IconButton>
													</TableCell>
												</TableRow>
											</>
									  ))
									: ''}
								{actionUS !== 'viewRutine' ? (
									<TableRow
										key='agregarEjercicio'
										hover
										sx={{
											border: 0,
										}} /* sx={{ '&:last-child td, &:last-child th': { border: 0 } }} */
									>
										<TableCell />
										<TableCell
											component='th'
											scope='row'
											align='center'>
											Agregar Ejercicio
											<AddCircleIcon
												fontSize='small'
												onClick={handleClickAddExceciseIcon(round.roundName)}
											/>
										</TableCell>
										<TableCell />
										<TableCell />
									</TableRow>
								) : (
									<></>
								)}
							</TableBody>
						</Table>
					</AccordionDetails>
				</Accordion>
				{/* /////////////////    Popover Ejercicio ////////////// */}
				<Popover
					open={openPopoverExerciseUS !== null}
					anchorEl={
						openPopoverExerciseUS === null
							? openPopoverExerciseUS
							: openPopoverExerciseUS.target
					}
					onClose={handleClosePopoverExercise}
					anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					PaperProps={{
						sx: {
							p: 1,
							width: 140,
							'& .MuiMenuItem-root': {
								px: 1,
								typography: 'body2',
								borderRadius: 0.75,
							},
						},
					}}>
					<MenuItem
						onClick={event =>
							handleClickViewExercise(
								event,
								openPopoverExerciseUS === null
									? openPopoverExerciseUS
									: openPopoverExerciseUS._id,
								round.order
							)
						}>
						<Iconify
							icon={'eva:eye-fill'}
							sx={{ mr: 2 }}
						/>
						Ver
					</MenuItem>
					{actionUS !== 'viewRutine' ? (
						<>
							<MenuItem
								onClick={event =>
									handleClickEditExercise(
										event,
										openPopoverExerciseUS === null
											? openPopoverExerciseUS
											: openPopoverExerciseUS._id
									)
								}>
								<Iconify
									icon={'eva:edit-fill'}
									sx={{ mr: 2 }}
								/>
								Modificar
							</MenuItem>
							<MenuItem
								sx={{ color: 'error.main' }}
								onClick={event =>
									handleClickDelteExercise(
										event,
										openPopoverExerciseUS === null
											? openPopoverExerciseUS
											: openPopoverExerciseUS._id,
										round.order
									)
								}>
								<Iconify
									icon={'eva:trash-2-outline'}
									sx={{ mr: 2 }}
								/>
								Borrar
							</MenuItem>
						</>
					) : (
						<></>
					)}
				</Popover>

				{/* /////////////////    Popover Rutina ////////////// */}

				<Popover
					open={openPopoverRutineUS !== null}
					anchorEl={
						openPopoverRutineUS === null
							? openPopoverRutineUS
							: openPopoverRutineUS.target
					}
					onClose={handleClosePopoverRutine}
					anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					PaperProps={{
						sx: {
							p: 1,
							width: 200,
							'& .MuiMenuItem-root': {
								px: 1,
								typography: 'body2',
								borderRadius: 0.75,
							},
						},
					}}>
					<>
						<MenuItem
							onClick={event =>
								handleClickEditRutine(
									event,
									openPopoverExerciseUS === null
										? openPopoverExerciseUS
										: openPopoverExerciseUS._id
								)
							}>
							<Iconify
								icon={'eva:edit-fill'}
								sx={{ mr: 2 }}
							/>
							Modificar Rutina
						</MenuItem>
						<MenuItem
							sx={{ color: 'error.main' }}
							onClick={event =>
								handleClickDelteRutine(
									event,
									openPopoverExerciseUS === null
										? openPopoverExerciseUS
										: openPopoverExerciseUS._id,
									round.order
								)
							}>
							<Iconify
								icon={'eva:trash-2-outline'}
								sx={{ mr: 2 }}
							/>
							Borrar Rutina
						</MenuItem>
					</>
				</Popover>
			</>
		);
		return RoundAcordions;
	};

	const getConfirmationDialog = () => {
		let title;
		let message;

		switch (confirmationAcionUS) {
			case 'deleteRound':
				title = 'Eliminar Round';
				message = '??Desea eliminar el Round?';
				break;
			case 'deleteExercise':
				title = 'Quitar Ejercicio';
				message = '??Desea quitar el Ejercicio?';
				break;
			case 'deleteRutine':
				title = 'Eliminar Rutina';
				message = '??Desea eliminar la rutina?';
				break;
			default:
				break;
		}

		return (
			<>
				<Dialog
					open={openConfirmationUS}
					/* onClose={handleClickDelteexercise} */
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							{message}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							value='aceptar'
							onClick={handleOnClickAceptDialogButons}>
							Aceptar
						</Button>
						<Button
							value='cancelar'
							onClick={handleOnClickAceptDialogButons}>
							Cancelar
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	};

	const prueba2 =() =>{
		console.log(rutineUS)
	}

	const handleClickRealizarRutinaButoon = () => {
		
		const rutineToUpdate={
			_id:rutineUS._id,
			status: "done"}

		updateRutine(rutineToUpdate).then(response => {
			if (response.status === 200) {
				console.log('SE SE ACTUALIZ?? LA RUTINA');
				setOpenFeedbackDialog(true)
				/* setOpenDialog(false);
				setIsLoading(true);
				setMessageAlertUS(`Se modific?? la rutina`);
				setOpenAlertUS(true);
				setSeverityAlertUS('success'); */
			} else {
				console.log('NO SE ACTUALIZ?? LA RUTINA');
				console.log('response: ', response);
			}
		});
	}

	const handleChangeTextFeddback = () => {
    	setTextFeedbackUS("");
  };


	const getTitle = () => {
		switch (actionUS) {
			case 'newRutine':
				return 'Nueva Rutina de Ejercicios';
			case 'viewRutine':
				return 'Rutina de Ejercicios';
			case 'editRutine':
				return 'Modificar Rutina de Ejercicios';
			default:
				return <></>;
		}
	};

	const prueba = () => {
		console.log(patientUS);
	};

	if (!isLoading) {
		return (
			<>
				<Helmet>
					<title>{getTitle()} </title>
				</Helmet>

				<Container>
					<Stack
						direction='row'
						alignItems='center'
						justifyContent='space-between'
						mb={5}>
						<Typography
							variant='h4'
							gutterBottom>
							{getTitle()}
						</Typography>
					</Stack>
					<Button
										variant='contained'
										color="success"										
										onClick={prueba2}>
										mostrar Rutina
							</Button>

					<Card>
						{localUserUS.type==="profesional"?(
						<Card>
							<Typography
								variant='h6'
								textAlign='left'
								sx={{ m: 1 }}>
								Paciente
							</Typography>

							<FormControl sx={{ m: 1 }}>
								<TextField
									id='pacientName'
									label='Nombre'
									variant='outlined'
									inputProps={{ readOnly: true }}
									/* error={!!errorsUS.pacientName} */
									value={patientUS.name}
									onChange={handleChangePacienteNameTextField}
								/>
							</FormControl>
							<FormControl sx={{ m: 1 }}>
								<TextField
									id='patientLasname'
									label='Apellido'
									variant='outlined'
									inputProps={{ readOnly: true }}
									/* error={!!errorsUS.pacientName} */
									value={patientUS.lastName}
									onChange={handleChangePacienteNameTextField}
								/>
							</FormControl>								
						</Card>
						)
						:(<></>)}

						
						
					<Card>
						{localUserUS.type==="profesional"?(
							<Grid
							container
							spacing={4}>
								<Grid
									item
									xs={11}>
									<Typography
										variant='h6'
										textAlign='left'
										sx={{ m: 1 }}>
										Rutina
									</Typography>
								</Grid>
								<Grid
									item
									xs={1}>
									{actionUS !== 'newRutine' ? (
										<IconButton
											size='large'
											color='inherit'
											onClick={handleOpenMenuRutine()}>
											<Iconify icon={'eva:more-vertical-fill'} />
										</IconButton>
									) : (
										<></>
									)}
								</Grid>
							</Grid>
						):(<></>)}
							
							<FormControl sx={{ m: 1 }}>
								<TextField
									id='rutineName'
									label='Nombre Rutina'
									variant='outlined'
									required={actionUS === 'newRutine'}
									inputProps={
										actionUS === 'viewRutine'
											? { readOnly: true }
											: { readOnly: false }
									}
									error={!!errorsUS.rutineName}
									value={rutineNameUS}
									onChange={handleChangeRutineNameTextField}
								/>
								{errorsUS.rutineName ? (
									<span style={{ color: 'red' }}>
										El nombre de la rutina es obligatorio
									</span>
								) : (
									<></>
								)}
							</FormControl>

							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									label='Fecha de la Rutina'
									value={rutineDateUS}
									views={['day', 'month', 'year']}
									inputProps={{ readOnly: true }}
									readOnly={actionUS !== 'newRutine'}
									onChange={newValue => {
										setValueDay(newValue);
									}}
									renderInput={params => (
										<TextField
											required={actionUS === 'newRutine'}
											sx={{ m: 1 }}
											{...params}
											helperText={null}
										/>
									)}
								/>
							</LocalizationProvider>

							{localUserUS.type==="profesional"?(
								<Typography
								variant='h6'
								textAlign='left'
								color={rutineUS.status==="pending"?("Red"):("Green")}
								sx={{ m: 1 }}>
								{rutineUS.status==="pending"?("Rutina No Realizada"):("Rutina SI realiza")}
							</Typography>
							):(
							<>
							{rutineUS.status==="pending"?
							(
								<Button
										variant='contained'
										value='cancelar'
										color="success"										
										onClick={handleClickRealizarRutinaButoon}>
											Realizar Rutina
								</Button>

							):(
								<Typography
								variant='h6'
								textAlign='left'
								color="Green"
								sx={{ m: 1 }}>
								Rutina Realiza
							</Typography>
								

							)}

							</>)}

							{/* {rutineUS.status==="pending"?
							(
								<Button
										variant='contained'
										value='cancelar'
										color="success"
										disabled
										onClick={handleCloseDialog}>
										Rutina Realizada
							</Button>

							):(
								<Typography
								variant='h6'
								textAlign='left'
								sx={{ m: 1 }}>
								Rutina Realiza
							</Typography>
								

							)}	 */}						

							<div>
								{rutineUS.rounds.map(round => getAccordions(round))}

								{actionUS !== 'viewRutine' ? (
									<>
										<Accordion
											sx={errorsUS.roundsRutine ? { color: 'error.main' } : ''}
											key='addRound'
											expanded={false}
											onChange={handleChangeAcordion('addRound')}>
											<AccordionSummary
												aria-controls='panel1bh-content'
												id='panel1bh-header'>
												<Typography sx={{ width: '33%', flexShrink: 0 }}>
													Agregar Round
													<AddCircleIcon fontSize='small' />
												</Typography>
											</AccordionSummary>
										</Accordion>

										{errorsUS.roundsRutine ? (
											<span style={{ color: 'red' }}>
												Debe agregar Rounds a la rutina
											</span>
										) : (
											<></>
										)}
									</>
								) : (
									<></>
								)}
							</div>
							<div>
								{actionUS !== 'viewRutine' ? (
									<Button
										variant='contained'
										onClick={handleClickSaveRutineButton}>
										Guardar Rutina
									</Button>
								) : (
									<></>
								)}
							</div>
						</Card>

						{/* /////////////////// dialogo seleccion de ejercicios /////////////////// */}
						<div>
							<Dialog
								open={openSelectExerciseDialog}
								onClose={handleCloseDialog}
								aria-labelledby='alert-dialog-title'
								aria-describedby='alert-dialog-description'
								fullWidth='xl'
								maxWidth='xl'>
								<DialogContent>
									<ExerciseListPage
										action={'selectExercise'}
										exercisesToAdd={exerciseToAddUS}
										setExerciseToAdd={setExerciseToAddUS}
										esValido={setEsValido}
									/>
								</DialogContent>
								<DialogActions>
									<Button
										value='cancelar'
										onClick={handleCloseDialog}>
										Cancelar
									</Button>
									<Button
										value='agregar'
										variant='contained'
										onClick={handleClickAddExerciseButton}>
										Agregar ejercicios
									</Button>
								</DialogActions>
							</Dialog>
						</div>

{/* /////////////////// dialogo mostrar de ejercicio /////////////////// */}
					
							<Dialog
								open={openViewExerciseDialog}
								onClose={handleCloseDialog}
								aria-labelledby='alert-dialog-title'
								aria-describedby='alert-dialog-description'
								fullWidth='xl'
								maxWidth='xl'>
								<DialogContent>
									<FormExercise
										action={{
											action: 'viewExercise',
											exercise: exerciseToViewUS,
										}}
									/>
								</DialogContent>
								<DialogActions>
									<Button
										value='cancelar'
										onClick={handleCloseDialog}>
										Cerrar
									</Button>
								</DialogActions>
							</Dialog>

{/* /////////////////// dialogo mostrar de ejercicio /////////////////// */}
					
<Dialog
								open={openFeedbackDialog}
								onClose={handleCloseDialog}
								aria-labelledby='alert-dialog-title'
								aria-describedby='alert-dialog-description'
								fullWidth='xl'
								maxWidth='xl'>
								<DialogContent>
										<Typography component="legend">Controlled</Typography>
										<Rating
											name="simple-controlled"
											value={startFeedbackUS}
											onChange={(event, newValue) => {
											setStartFeedbackUS(newValue);
											}}
										/>
										<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">Age</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={textFeedbackUS}
											label="Age"
											onChange={handleChangeTextFeddback}
										>
											<MenuItem value={"No termine"}>No termine</MenuItem>
											<MenuItem value={"Bien"}>Bien</MenuItem>
											<MenuItem value={"Necesito m??s"}>Necesito m??s</MenuItem>
										</Select>
										</FormControl>
								</DialogContent>
								<DialogActions>
									<Button
										value='cancelar'
										onClick={handleCloseDialog}>
										Cerrar
									</Button>
								</DialogActions>
							</Dialog>							
						

						<div>{getConfirmationDialog()}</div>
					</Card>
				</Container>
			</>
		);
	}
}
