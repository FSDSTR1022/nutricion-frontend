/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ListExcersice from './listExercise';
import {
	saveRutine,
	getRutines,
	updateRutine,
	deleteexercise,
} from '../services/routineService';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
	FormControlLabel,
	Switch,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Button,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Box,
	TextField,
	InputAdornment,
	DialogContent,
	DialogActions,
	Dialog,
	Chip,
	DialogTitle,
	DialogContentText,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';

const NewRoutine = props => {
	const [accordionExpanded, setAccordionExpanded] = useState(false);
	const [rutineUS, setRutineUS] = useState({
		name: '',
		patient: '',
		day: '',
		rounds: [],
	});
	const [roundToEdit, setRoundToEdit] = useState('');
	const [roundNameToEdit, setRoundNameToEdit] = useState('');

	const [openSelectexerciseDialog, setOpenSelectexerciseDialog] =
		useState(false);
	const [errorTextFild, setErrorTextFild] = useState(false);

	const [exerciseToAddUS, setexerciseToAddUS] = useState([]);
	const [
		roundDondeSeAgregaraElEjercicioUS,
		SetRoundDondeSeAgregaraElEjercicioUS,
	] = useState('');

	const [rutineNameUS, setRutineNameUS] = useState('Fuerza');
	/* const [pacienteNameUS,setPacienteNameUS] = useState("63c3d4407a71c2a2014d7501")  */
	const [pacientUS, setPacienteNameUS] = useState({
		name: 'Juan Carlos Todo Poderoso',
		_id: '63c3d4407a71c2a2014d7501',
	});
	const [rutineDateUS, setRutineDateUS] = useState('2023-02-03');
	const [valueDay, setValueDay] = useState(null);

	const [errorsUS, setErrorsUS] = useState({});

	/* para las confirmaciones de eliminación */
	const [openConfirmationUS, setOpenConfirmationUS] =
		useState(false); /* para mostrar el dialogo de confirmación */
	const [confirmationAcionUS, setConfirmationAcionUS] = useState('');

	const [actionUS, setActionUS] = useState({});

	const [exerciseToDeleteOrEdit, setExerciseToDeleteOrEdit] = useState('');

	const navigate = useNavigate();

	const { action } = props;

	useEffect(() => {
		/* if (action === undefined) {
			/* setActionUS('newRutine'); 
			setActionUS('editRutine');
		} else {
			setActionUS(action);
		} */

		/* setActionUS('newRutine');  */
		setActionUS('editRutine');
		/* setActionUS('showRutine'); */

		switch (action) {
			case 'newRutine':
				break;

			case 'showRutine':
				break;
			case 'editRutine':
				break;
			default:
				break;
		}
	}, []);

	const handleChangeAcordion = roundOrder => (event, isExpanded) => {
		if (roundOrder === 'addRound') {
			const rounds = rutineUS.rounds;

			rounds.push({
				order: rounds.length + 1,
				roundName: 'Nuevo',
				exercises: [],
			});

			setRutineUS(rutineUS => ({
				...rutineUS,
				rounds,
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

	const handleChangepacienteNameTextField = event => {
		setPacienteNameUS(event.target.value);
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
		setOpenSelectexerciseDialog(true);
	};

	const handleClickEditExceciseIcon = (roundOrder, excersiceId) => event => {
		console.log(
			'Click EDIT exercise ICON ///////////////////////////////////777777777777/'
		);
	};

	const handleClickDeleteExceciseIcon = (roundOrder, excersiceId) => event => {
		setRoundToEdit(roundOrder);
		setExerciseToDeleteOrEdit(excersiceId);
		setConfirmationAcionUS('deleteExercise');
		setOpenConfirmationUS(true);
	};

	const handleClickDeleteRoundIcon = roundOrder => event => {
		setOpenConfirmationUS(true);
		setConfirmationAcionUS('deleteRound');
	};

	const deleteRound = () => {
		const rounds = rutineUS.rounds;

		const index = rounds.findIndex(element => {
			return element.order === roundToEdit;
		});

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
		// sacar el ejercicio del round

		const rounds = rutineUS.rounds;

		const indexRound = rounds.findIndex(element => {
			return element.order === roundToEdit;
		});

		const indexExercise = rounds[indexRound].exercises.findIndex(exercise => {
			return exercise.exercise._id === exerciseToDeleteOrEdit;
		});

		rounds[indexRound].exercises.splice(indexExercise, 1);

		setRutineUS(rutineUS => ({
			...rutineUS,
			rounds,
		}));
	};

	const handleOnChangeRoundNameTextField = (roundOrder, roundName) => event => {
		setRoundNameToEdit(event.target.value);
	};

	const handleKeyDonwRoundNameTextFiled = roundOrder => event => {
		if (event.key === 'Enter') {
			const rounds = rutineUS.rounds;
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
		const rounds = rutineUS.rounds;
		rounds.map(round => {
			if (round.order === roundOrder) {
				round.roundName = roundNameToEdit;
			}
			return true;
		});

		setRoundToEdit('');
		setRoundNameToEdit('');
	};

	const handleOnClickDialogButons = event => {
		if (event.target.value === 'aceptar') {
			if (confirmationAcionUS === 'deleteRound') {
				deleteRound();
			} else if (confirmationAcionUS === 'deleteExercise') {
				deleteExercise();
			}
			setOpenConfirmationUS(false);
			setConfirmationAcionUS('');
			setRoundToEdit('');
		} else if (event.target.value === 'cancelar') {
			setExerciseToDeleteOrEdit();
			setOpenConfirmationUS(false);
			setConfirmationAcionUS('');
		}
	};

	const handleClickAddexerciseButton = () => {
		const rutina = rutineUS;
		const round = rutina.rounds.find(round => {
			return round.roundName === roundDondeSeAgregaraElEjercicioUS;
		});

		round.exercises = round.exercises.concat(exerciseToAddUS);

		// ¿porque no me hace falt esto que sigue?
		/* setRutineUS(rutineUS => ({
			...rutineUS,
			round,
		})); */

		setexerciseToAddUS([]);
		SetRoundDondeSeAgregaraElEjercicioUS('');
		setOpenSelectexerciseDialog(false);

		/* setPruebaRutina(rutineUS) */
	};

	const handleCloseDialog = () => {
		setexerciseToAddUS([]);
		setOpenSelectexerciseDialog(false);
	};

	const handleClickShowexerciseButton = () => {
		console.log(exerciseToAddUS);
	};

	const handleClickShowRutineButton = () => {
		console.log('rutineUS: ', rutineUS);
		/* console.log("pruebaRutina: ",pruebaRutina) */
	};

	const handleClickSaveRutineButton = () => {
		if (checkForm()) {
			console.log('GUARDAR RUTINA');

			const rutineToSave = {};

			rutineToSave.rounds = rutineUS.rounds;

			rutineToSave.rounds.map(round => {
				if (round.exercises.length > 0) {
					round?.exercises.map(e => {
						e.exercise = e.exercise._id;
					});
				}
			});

			rutineToSave.name = rutineNameUS;
			rutineToSave.day = rutineDateUS;
			rutineToSave.patient = pacientUS._id;

			console.log(rutineToSave);

			saveRutine(rutineToSave).then(response => {
				console.log('response.stat:', response.status);

				if (response.status === 200) {
					console.log('SE GUARDO CON EXITO');
					/* navigate('/Rutina', {
						state: { action: 'newRutine' },
					}); */
				} else {
					console.log('NO SE GUARDO CON EXITO');
				}
			});
		}
	};

	const checkForm = () => {
		let errors = true;

		/* if (pacienteNameUS === undefined || pacienteNameUS === '') {
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
			setErrorsUS(errorsUS => ({
				...errorsUS,
				roundsRutine: true,
			}));

			errors = false;
		}
		return errors;
	};

	const getTitle = () => {
		switch (actionUS) {
			case 'newRutine':
				return <h1>Nueva Rutina de Ejercicios</h1>;
			case 'showRutine':
				return <h1>Rutina de Ejercicios</h1>;
			case 'editRutine':
				return <h1>Modificar Rutina de Ejercicios</h1>;
		}
	};

	const mostrarDay = () => {
		console.log(valueDay);
		console.log(valueDay.$D);
	};

	const getAccordions = round => {
		const RoundAcordions = (
			<Accordion
				key={round.order}
				expanded={accordionExpanded === round.order}
				onChange={handleChangeAcordion(round.order)}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1bh-content'
					id='panel1bh-header'
				>
					{roundToEdit !== round.order ? (
						<Typography sx={{ width: '33%', flexShrink: 0 }}>
							{'Round ' + round.roundName}
						</Typography>
					) : (
						<>
							<Box
								sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
								noValidate
								autoComplete='off'
								margin='dense'
							>
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
					{actionUS !== 'showRutine' ? (
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
						<div></div>
					)}

					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						{round.exercises.length > 0 ? (
							<TableHead>
								<TableRow>
									<TableCell align='center'>Nombre Ejercicio</TableCell>
									<TableCell align='center'>Tiempo / repeticiones </TableCell>
									<TableCell align='center'>Elementos </TableCell>
									{actionUS !== 'showRutine' ? (
										<TableCell align='center'></TableCell>
									) : (
										<></>
									)}
								</TableRow>
							</TableHead>
						) : null}
						<TableBody>
							{round.exercises !== undefined
								? round.exercises.map(exercise => {
										return (
											<>
												<TableRow
													key={exercise.exerciseName}
													hover={true}
													sx={{
														'&:last-child td, &:last-child th': { border: 0 },
													}}
												>
													<TableCell component='th' scope='row' align='center'>
														{exercise.exercise.name}
													</TableCell>
													<TableCell component='th' scope='row' align='center'>
														{exercise.timeOReps}
													</TableCell>
													<TableCell component='th' scope='row' align='center'>
														<Box
															sx={{
																display: 'flex',
																flexWrap: 'wrap',
																justifyContent: 'center',
																gap: 0.5,
															}}
														>
															{exercise.exercise.equipments.map(equipment => (
																<Chip
																	key={equipment._id}
																	label={equipment.exerciseEquipment}
																/>
															))}
														</Box>
													</TableCell>
													{actionUS !== 'showRutine' ? (
														<TableCell
															component='th'
															scope='row'
															align='center'
														>
															<DeleteIcon
																fontSize='small'
																onClick={handleClickDeleteExceciseIcon(
																	round.order,
																	exercise.exercise._id
																)}
															/>
														</TableCell>
													) : (
														<></>
													)}
												</TableRow>
											</>
										);
								  })
								: ''}
							{actionUS !== 'showRutine' ? (
								<TableRow
									key='agregarEjercicio'
									hover={true}
									sx={{
										border: 0,
									}} /* sx={{ '&:last-child td, &:last-child th': { border: 0 } }} */
								>
									<TableCell />
									<TableCell component='th' scope='row' align='center'>
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
		);
		return RoundAcordions;
	};

	const getConfirmationDialog = () => {
		let title, message;

		switch (confirmationAcionUS) {
			case 'deleteRound':
				title = 'Eliminar Round';
				message = '¿Seguro desea eliminar el Round?';
				break;
			case 'deleteExercise':
				title = 'Eliminar Ejercicio';
				message = '¿Seguro desea eliminar el Ejercicio?';
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
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							{message}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button value='aceptar' onClick={handleOnClickDialogButons}>
							Aceptar
						</Button>
						<Button value='cancelar' onClick={handleOnClickDialogButons}>
							Cancelar
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	};

	return (
		<>
			<div>{getTitle()}</div>
			<div>
				<h2>Paciente: {pacientUS.name}</h2>

				{actionUS === 'editRutine' ? (
					<>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label='Fecha de la Rutina'
								value={rutineDateUS}
								views={['day', 'month', 'year']}
								onChange={newValue => {
									setValueDay(newValue);
								}}
								renderInput={params => (
									<TextField
										required
										sx={{ m: 1 }}
										{...params}
										helperText={null}
									/>
								)}
							/>
						</LocalizationProvider>
						<br></br>
					</>
				) : (
					<h2>Fecha: {rutineDateUS}</h2>
				)}

				{actionUS === 'editRutine' || actionUS === 'newRutine' ? (
					<FormControl sx={{ m: 1 }}>
						<TextField
							id='rutineName'
							label='Nombre Rutina'
							variant='outlined'
							required
							error={!!errorsUS.excersiceName}
							value={rutineNameUS}
							onChange={handleChangeRutineNameTextField}
						/>
						{errorsUS.rutineName ? (
							<span style={{ color: 'red' }}>
								El nombre de la rutina es obligatorio
							</span>
						) : (
							<span></span>
						)}
					</FormControl>
				) : (
					<h2>Nombre Rutina: {rutineNameUS}</h2>
				)}

				{/* <FormControl sx={{ m: 1 }}>
					<TextField
						id='pacientName'
						label='Nombre Paciente'
						variant='outlined'
						required
						error={!!errorsUS.pacientName}
						value={pacienteNameUS}
						onChange={handleChangepacienteNameTextField}
					/>
					{errorsUS.pacientName ? (
						<span style={{ color: 'red' }}>
							El nombre del paciente es obligatorio
						</span>
					) : (
						<span></span>
					)}
				</FormControl> */}
			</div>

			<div>
				{rutineUS.rounds.map(round => {
					return getAccordions(round);
				})}

				{actionUS !== 'showRutine' ? (
					<Accordion
						key='addRound'
						expanded={false}
						onChange={handleChangeAcordion('addRound')}
					>
						<AccordionSummary
							aria-controls='panel1bh-content'
							id='panel1bh-header'
						>
							<Typography sx={{ width: '33%', flexShrink: 0 }}>
								Agregar Round
								<AddCircleIcon fontSize='small' />
							</Typography>
						</AccordionSummary>
					</Accordion>
				) : (
					<></>
				)}
			</div>
			<div>
				<Button variant='contained' onClick={handleClickSaveRutineButton}>
					Guardar Rutina
				</Button>
			</div>
			<div>
				<br />
				<Button variant='contained' onClick={handleClickShowRutineButton}>
					Mostrar Rutina
				</Button>
				<Button variant='contained' onClick={handleClickShowexerciseButton}>
					Mostrar ejercicios a agregar
				</Button>
			</div>
			<div>
				<Dialog
					open={openSelectexerciseDialog}
					onClose={handleCloseDialog}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
					/* fullWidth="xl" */
					maxWidth='xl'
				>
					<DialogContent>
						<ListExcersice
							action={'selectexercise'}
							exercisesToAdd={exerciseToAddUS}
							setexerciseToAdd={setexerciseToAddUS}
							setOpenDialog={setOpenSelectexerciseDialog}
						></ListExcersice>
					</DialogContent>
					<DialogActions>
						<Button value='cancelar' onClick={handleCloseDialog}>
							Cancelar
						</Button>
						<Button value='agregar' onClick={handleClickAddexerciseButton}>
							Agregar ejercicios
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<div>{getConfirmationDialog()}</div>

			<Button value='agregar' onClick={mostrarDay}>
				Agregar ejercicios
			</Button>
		</>
	);
};

export default NewRoutine;
