/* eslint-disable no-lonely-if */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable spaced-comment */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
	Card,
	Table,
	Stack,
	Paper,
	Avatar,
	Button,
	Popover,
	Checkbox,
	TableRow,
	MenuItem,
	TableBody,
	TableCell,
	Container,
	Typography,
	IconButton,
	TableContainer,
	TablePagination,
	Chip,
	Box,
	ImageList,
	ImageListItem,
	DialogContent,
	Dialog,
	DialogActions,
	Snackbar,
	Alert,
	DialogTitle,
	DialogContentText,
	FormControl,
	TextField,
	CircularProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// components
import { Navigate } from 'react-router-dom';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import ExerciseListHead from '../../sections/@dashboard/exercise/UserListHead';
import ExerciseListToolbar from '../../sections/@dashboard/exercise/ExerciseListToolbar';
import {
	getExercise,
	getExerciseAtribut,
	deleteExercise,
} from '../../services/exerciseService';
import FormExercise from './NewExercisePage';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			_user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map(el => el[0]);
}

export default function ExerciseListPage(props) {
	const [openUS, setOpenUS] = useState(null);
	const [pageUS, setPageUS] = useState(0);
	const [orderUS, setOrderUS] = useState('asc');
	const [selectedExerciseUS, setSelectedExerciseUS] = useState([]);
	const [orderByUS, setOrderByUS] = useState('name');
	const [filterNameUS, setFilterNameUS] = useState('');
	const [rowsPerPageUS, setRowsPerPageUS] = useState(5);

	const [isLoadingExerciseUS, setIsLoadingExerciseUS] = useState(true);
	const [isLoadingexerciseAtributes, setIsLoadingExcersiceAtributes] =
		useState(true);
	const [exerciseListUS, setexerciseListUS] = useState([]);
	const [exerciseAtributsUS, setExerciseAtributesUS] = useState();

	const [openConfirmationUS, setOpenConfirmationUS] =
		useState(false); /* para el dialogo de confirmación de eliminar ejercicio */

	const [openFormDialogUS, setOpenFormDialogUS] =
		useState(false); /* para abrir el dialog del formulario de ejercicios */
	const [actionToDoInexerciseDialogUS, setActionToDoInexerciseDialogUS] =
		useState(); /* para saber que accion se realiza con el formulario de ejercicio */
	const [exerciseToDeleteOrEditUS, setExerciseToDeleteOrEditUS] =
		useState(''); /* para pasar el ejercicio al formulario de ejercicio */
	const [resultActinDialogUs, setResultActinDialogUS] =
		useState(''); /* para saber el resultado del formulario de ejercicio */

	const [openAlertUS, setOpenAlertUS] = useState(false);
	const [messageAlertUS, setMessageAlertUS] = useState('');
	const [severityAlertUS, setSeverityAlertUS] = useState('success');

	const [renderUS, setRenderizadoUS] = useState(false);

	const [actionUS, setActionUS] = useState();

	const { action, exercisesToAdd, setExerciseToAdd } = props;

	const redireccionar = ()=>{
		Navigate("/404")
	}

	useEffect(() => {

		/* const user = localStorage.getItem('user');
		const userJSON = JSON.parse(user)
		console.log("USER:",userJSON)

				
		if(user!== null && userJSON.type === "patient"){
			console.log("Entro")
			redireccionar()
		} */
		


		if (action === undefined) {
			setActionUS('listExercise');
		} else {
			setActionUS(action);
		}

		const getExe = async () => {
			const responseExercise = await getExercise();
			if (responseExercise.status === 200) {
				setexerciseListUS(responseExercise.data);
				setIsLoadingExerciseUS(false);
			}
		};

		const getEA = async () => {
			const response = await getExerciseAtribut();
			if (response.status === 200) {
				setExerciseAtributesUS(response.data);
				setIsLoadingExcersiceAtributes(false);
			}
		};
		getEA();
		getExe();
	}, [openAlertUS]);

	const getTableHead = () => {
		const TABLE_HEAD = [
			{ id: 'name', label: 'Nombre', alignRight: false },
			{ id: 'difficulty', label: 'Dificultad', alignRight: false },
			{ id: 'exerciseType', label: 'Tipo', alignRight: false },
			{ id: 'bodyPart', label: 'Pastes Cuerpos', alignRight: false },
			{ id: 'muscles', label: 'Musculos', alignRight: false },
			{ id: 'equipments', label: 'Equipamiento', alignRight: false },
		];

		let arrayConcat = [];

		if (actionUS === 'listExercise') {
			arrayConcat = TABLE_HEAD.concat([
				{ id: 'video', label: 'Demostración', alignRight: false },
				{ id: '' },
			]);
		} else if (actionUS === 'selectExercise') {
			arrayConcat = TABLE_HEAD.concat([
				{ id: 'repsTime', label: 'Repeticiones/Tiempo', alignRight: false },
				{ id: '' },
			]);
		}
		return arrayConcat;
	};

	const handleOpenMenu = id => event => {
		setOpenUS({ _id: id, target: event.currentTarget });
	};

	const handleCloseMenu = () => {
		setOpenUS(null);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderByUS === property && orderUS === 'asc';
		setOrderUS(isAsc ? 'desc' : 'asc');
		setOrderByUS(property);
	};

	const handleSelectAllClick = event => {
		console.log(event.target.checked);

		if (event.target.checked) {
			const newSelecteds = exerciseListUS.map(n => n._id);
			setSelectedExerciseUS(newSelecteds);

			if (action === 'selectExercise' && setExerciseToAdd !== undefined) {
				const detalleEjerciciosAAgregar = newSelecteds.map(exer => ({
					exercise: exerciseListUS.find(({ _id }) => _id === exer),
				}));

				if (exercisesToAdd.length === 0) {
					setExerciseToAdd(detalleEjerciciosAAgregar);
				} else {
					console.log(detalleEjerciciosAAgregar);

					const exercisesToAddLimpio = detalleEjerciciosAAgregar.filter(
						deaa => {
							return !exercisesToAdd.some(
								eta => eta.exercise._id === deaa.exercise._id
							);
						}
					);

					setExerciseToAdd(exercisesToAdd.concat(exercisesToAddLimpio));
				}
			}
		} else {
			setSelectedExerciseUS([]);
			setExerciseToAdd([]);
		}
	};

	const handleClickSelectExerciseCheckBox = (event, id) => {
		const selectedIndex = selectedExerciseUS.indexOf(id);
		let exerciseSelected = [];
		if (selectedIndex === -1) {
			exerciseSelected = exerciseSelected.concat(selectedExerciseUS, id);
		} else if (selectedIndex === 0) {
			exerciseSelected = exerciseSelected.concat(selectedExerciseUS.slice(1));
		} else if (selectedIndex === selectedExerciseUS.length - 1) {
			exerciseSelected = exerciseSelected.concat(
				selectedExerciseUS.slice(0, -1)
			);
		} else if (selectedIndex > 0) {
			exerciseSelected = exerciseSelected.concat(
				selectedExerciseUS.slice(0, selectedIndex),
				selectedExerciseUS.slice(selectedIndex + 1)
			);
		}
		setSelectedExerciseUS(exerciseSelected);

		if (action === 'selectExercise' && setExerciseToAdd !== undefined) {
			const detalleEjerciciosAAgregar = exerciseSelected.map(exer => ({
				exercise: exerciseListUS.find(({ _id }) => _id === exer),
			}));

			if (exercisesToAdd.length === 0) {
				setExerciseToAdd(detalleEjerciciosAAgregar);
			} else {
				if (event.target.checked) {
					const exercisesToAddLimpio = detalleEjerciciosAAgregar.filter(
						deaa => {
							return !exercisesToAdd.some(
								eta => eta.exercise._id === deaa.exercise._id
							);
						}
					);

					setExerciseToAdd(exercisesToAdd.concat(exercisesToAddLimpio));
				} else {
					const exercisesToAddLimpio = exercisesToAdd.filter(el => {
						return detalleEjerciciosAAgregar.some(
							deaa => el.exercise._id === deaa.exercise._id
						);
					});

					setExerciseToAdd(exercisesToAddLimpio);
				}
			}
		}
	};

	const handleChangePage = (event, newPage) => {
		setPageUS(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setPageUS(0);
		setRowsPerPageUS(parseInt(event.target.value, 10));
	};

	const handleFilterByName = event => {
		setPageUS(0);
		setFilterNameUS(event.target.value);
	};

	const emptyRows =
		pageUS > 0
			? Math.max(0, (1 + pageUS) * rowsPerPageUS - exerciseListUS.length)
			: 0;

	const filteredPatients = applySortFilter(
		exerciseListUS,
		getComparator(orderUS, orderByUS),
		filterNameUS
	);

	const isNotFound = !filteredPatients.length && !!filterNameUS;

	const handleClickNewExweciseButton = event => {
		setActionToDoInexerciseDialogUS('newExercise');
		setOpenFormDialogUS(true);
	};

	const handleCloseFormExerciseDialog = evento => {
		setOpenFormDialogUS(false);
	};

	const handleClickViewExercise = (event, id) => {
		const excersiceToView = exerciseListUS.find(element => element._id === id);

		setActionToDoInexerciseDialogUS('viewExercise');
		setExerciseToDeleteOrEditUS(excersiceToView);
		setOpenFormDialogUS(true);
		setOpenUS(null);
	};

	const handleClickEditExercise = (event, id) => {
		const excersiceToEdit = exerciseListUS.find(element => element._id === id);

		setActionToDoInexerciseDialogUS('editExercise');
		setExerciseToDeleteOrEditUS(excersiceToEdit);
		setOpenFormDialogUS(true);
		setOpenUS(null);
	};

	const handleClickDelteExercise = (event, id) => {
		const excersiceToDelete = exerciseListUS.find(
			exercise => exercise._id === id
		);

		setExerciseToDeleteOrEditUS(excersiceToDelete);
		setOpenConfirmationUS(true);
		setOpenUS(null);
	};

	const getDialogContent = () => {
		switch (actionToDoInexerciseDialogUS) {
			case 'newExercise':
				return (
					<FormExercise
						action={{
							action: 'newExercise',
							openFrom: 'listExercise',
							setOpendialog: setOpenFormDialogUS,
							setMessageAlert: setMessageAlertUS,
							openAlert: setOpenAlertUS,
							severityAler: setSeverityAlertUS,
						}}
					/>
				);

			case 'editExercise':
				return (
					<FormExercise
						action={{
							action: 'editExercise',
							openFrom: 'listExercise',
							exercise: exerciseToDeleteOrEditUS,
							setOpendialog: setOpenFormDialogUS,
							setMessageAlert: setMessageAlertUS,
							openAlert: setOpenAlertUS,
							severityAler: setSeverityAlertUS,
						}}
					/>
				);

			case 'viewExercise':
				return (
					<FormExercise
						action={{
							action: 'viewExercise',
							openFrom: 'listExercise',
							exercise: exerciseToDeleteOrEditUS,
							setOpendialog: setOpenFormDialogUS,
							setMessageAlert: setMessageAlertUS,
							openAlert: setOpenAlertUS,
							severityAler: setSeverityAlertUS,
						}}
					/>
				);

			default:
				return <h1>No se puede cargar el formulario</h1>;
		}
	};

	const handleCloseMessage = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlertUS(false);
		}
		setOpenAlertUS(false);
	};

	const handleClickAceptDelteExercise = async event => {
		if (event.target.value === 'aceptar') {
			const responseSave = await deleteExercise(exerciseToDeleteOrEditUS);
			if (responseSave.status === 200) {
				setMessageAlertUS('Se elimino el ejercicio');
				setSeverityAlertUS('success');
			} else {
				setMessageAlertUS('No se pudo eliminar el ejercicio');
				setSeverityAlertUS('error');
			}
			setOpenAlertUS(true);
			setOpenConfirmationUS(false);
		} else if (event.target.value === 'cancelar') {
			setOpenConfirmationUS(false);
			setExerciseToDeleteOrEditUS();
		}
		setOpenUS(null);
		setExerciseToDeleteOrEditUS('');

		if (renderUS) {
			setRenderizadoUS(false);
		} else {
			setRenderizadoUS(true);
		}
	};

	const handleChangeExerciseRepTimeTexField = exerciseId => event => {
		if (exercisesToAdd !== undefined) {
			const updateArray = exercisesToAdd.map(detalleEjercicio => {
				if (detalleEjercicio.exercise._id === exerciseId) {
					return {
						...detalleEjercicio,
						timeOReps: event.target.value,
					};
				}
				return detalleEjercicio;
			});

			setExerciseToAdd(updateArray);
		}
	};

	const getTitle = () => {
		switch (actionUS) {
			case 'selectExercise':
				return 'Seleccionar ejercicios';
			case 'listExercise':
				return 'Ejercicios';
			default:
				return <></>;
		}
	};

	if (!isLoadingExerciseUS && !isLoadingexerciseAtributes) {
		return (
			<>
				<Helmet>
					<title> {getTitle()} </title>
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
						<Button
							variant='contained'
							startIcon={<Iconify icon='eva:plus-fill' />}
							onClick={handleClickNewExweciseButton}>
							Nuevo Ejercicio
						</Button>
					</Stack>

					<Card>
						<ExerciseListToolbar
							numSelected={selectedExerciseUS.length}
							filterName={filterNameUS}
							onFilterName={handleFilterByName}
							deleteOption={actionUS !== 'selectExercise'}
						/>

						<Scrollbar>
							<TableContainer sx={{ minWidth: 800 }}>
								<Table>
									<ExerciseListHead
										order={orderUS}
										orderBy={orderByUS}
										headLabel={getTableHead()}
										rowCount={exerciseListUS.length}
										numSelected={selectedExerciseUS.length}
										onRequestSort={handleRequestSort}
										onSelectAllClick={handleSelectAllClick}
									/>
									<TableBody>
										{filteredPatients
											.slice(
												pageUS * rowsPerPageUS,
												pageUS * rowsPerPageUS + rowsPerPageUS
											)
											.map(row => {
												const {
													_id,
													name,
													difficulty,
													exerciseType,
													bodyParts,
													muscles,
													equipments,
													photo,
													video,
												} = row;
												const selectedExercise =
													selectedExerciseUS.indexOf(_id) !== -1;

												return (
													<TableRow
														hover
														key={_id}
														tabIndex={-1}
														role='checkbox'
														selected={selectedExercise}>
														<TableCell padding='checkbox'>
															<Checkbox
																checked={selectedExercise}
																onChange={event =>
																	handleClickSelectExerciseCheckBox(event, _id)
																}
															/>
														</TableCell>

														<TableCell
															component='th'
															scope='row'
															padding='none'>
															<Stack
																direction='row'
																alignItems='center'
																spacing={2}>
																<Avatar
																	alt={name}
																	src={photo}
																/>
																<Typography
																	variant='subtitle2'
																	noWrap>
																	{name}
																</Typography>
															</Stack>
														</TableCell>

														<TableCell align='left'>
															{difficulty.exerciseDifficulty}
														</TableCell>

														<TableCell align='left'>
															{exerciseType.exerciseType}
														</TableCell>

														<TableCell align='center'>
															<Box
																sx={{
																	display: 'flex',
																	flexWrap: 'wrap',
																	gap: 0.2,
																}}>
																{bodyParts.map(part => (
																	<Chip
																		key={part._id}
																		label={part.bodyPart}
																	/>
																))}
															</Box>
														</TableCell>
														<TableCell>
															<Box
																sx={{
																	display: 'flex',
																	flexWrap: 'wrap',
																	gap: 0.2,
																}}>
																{muscles.map(muscle => (
																	<Chip
																		key={muscle._id}
																		label={muscle.muscle}
																	/>
																))}
															</Box>
														</TableCell>
														<TableCell align='center'>
															<Box
																sx={{
																	display: 'flex',
																	flexWrap: 'wrap',
																	gap: 0.2,
																}}>
																{equipments.map(equipment => (
																	<Chip
																		key={equipment._id}
																		label={equipment.exerciseEquipment}
																	/>
																))}
															</Box>
														</TableCell>

														{actionUS === 'listExercise' ? (
															<TableCell align='center'>
																{
																	<ImageList
																		sx={{ width: 100, height: 50 }}
																		cols={1}
																		rowHeight={60}>
																		<ImageListItem key={`video:${_id}`}>
																			<img
																				src={video}
																				srcSet={video}
																				alt={'Video'}
																				loading='Cargando...'
																			/>
																		</ImageListItem>
																	</ImageList>
																}
															</TableCell>
														) : (
															<TableCell align='center'>
																<FormControl sx={{ m: 1, minWidth: 50 }}>
																	<TextField
																		id='repsTime'
																		required
																		label='Repeticiones / Tiempo'
																		variant='outlined'
																		disabled={
																			!exercisesToAdd.some(
																				excerciseDetail =>
																					excerciseDetail.exercise._id === _id
																			)
																		}
																		error={
																			!!exercisesToAdd.some(excerciseDetail => {
																				if (
																					excerciseDetail.exercise._id === _id
																				) {
																					if (
																						excerciseDetail.timeOReps === ''
																					) {
																						return true;
																					} else {
																						return false;
																					}
																				}
																			})
																		}
																		helperText='Ingresar un valor'
																		/* value={devolverTimeoReps(exercise._id)} */
																		onChange={handleChangeExerciseRepTimeTexField(
																			_id
																		)}
																	/>
																</FormControl>
															</TableCell>
														)}

														<TableCell align='right'>
															<IconButton
																size='large'
																color='inherit'
																onClick={handleOpenMenu(_id)}>
																<Iconify icon={'eva:more-vertical-fill'} />
															</IconButton>
														</TableCell>
													</TableRow>
												);
											})}
										{emptyRows > 0 && (
											<TableRow style={{ height: 53 * emptyRows }}>
												<TableCell colSpan={6} />
											</TableRow>
										)}
									</TableBody>

									{isNotFound && (
										<TableBody>
											<TableRow>
												<TableCell
													align='center'
													colSpan={6}
													sx={{ py: 3 }}>
													<Paper
														sx={{
															textAlign: 'center',
														}}>
														<Typography
															variant='h6'
															paragraph>
															Not found
														</Typography>

														<Typography variant='body2'>
															No results found for &nbsp;
															<strong>&quot;{filterNameUS}&quot;</strong>.
															<br /> Try checking for typos or using complete
															words.
														</Typography>
													</Paper>
												</TableCell>
											</TableRow>
										</TableBody>
									)}
								</Table>
							</TableContainer>
						</Scrollbar>

						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component='div'
							count={exerciseListUS.length}
							rowsPerPage={rowsPerPageUS}
							page={pageUS}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Card>
				</Container>

				<Popover
					open={openUS !== null}
					anchorEl={openUS === null ? openUS : openUS.target}
					onClose={handleCloseMenu}
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
								openUS === null ? openUS : openUS._id
							)
						}>
						<Iconify
							icon={'eva:eye-fill'}
							sx={{ mr: 2 }}
						/>
						Ver
					</MenuItem>
					{actionUS === 'listExercise' ? (
						<>
							<MenuItem
								onClick={event =>
									handleClickEditExercise(
										event,
										openUS === null ? openUS : openUS._id
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
										openUS === null ? openUS : openUS._id
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

				{/* ///////////////////// Dialogo de confirmación  ///////////////////// */}
				<Dialog
					open={openConfirmationUS}
					onClose={handleClickDelteExercise}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle id='alert-dialog-title'>
						{'Eliminar Ejercicio'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							¿Desea eliminar el ejercicio?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							value='aceptar'
							onClick={handleClickAceptDelteExercise}>
							Aceptar
						</Button>
						<Button
							value='cancelar'
							onClick={handleClickAceptDelteExercise}>
							{' '}
							Cancelar{' '}
						</Button>
					</DialogActions>
				</Dialog>

				{/* ///////////////////// Dialogo nuevo ejercicio  ///////////////////// */}
				<Dialog
					open={openFormDialogUS}
					onClose={handleCloseFormExerciseDialog}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
					/* fullWidth="xl" */
					maxWidth='xl'>
					<DialogContent>{getDialogContent()}</DialogContent>
					<DialogActions>
						<Button
							value='cancelar'
							onClick={handleCloseFormExerciseDialog}>
							{' '}
							Cancelar{' '}
						</Button>
					</DialogActions>
				</Dialog>

				{/* ///////////////////// Mensaje de resultado  ///////////////////// */}

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
	} else {
		return (
			<>
				<Helmet>
					<title> Ejercicios </title>
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
							Ejercicios
						</Typography>
						<Button
							variant='contained'
							startIcon={<Iconify icon='eva:plus-fill' />}
							onClick={handleClickNewExweciseButton}>
							Nuevo Ejercicio
						</Button>
					</Stack>

					<Card>
						<Box
							sx={{
								with: '100vw',
								height: '50vh',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<CircularProgress />
						</Box>
					</Card>
				</Container>
			</>
		);
	}
}
