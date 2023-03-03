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
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

import { getAllUsers } from '../../services/userService';
import {
	getExercise,
	getExerciseAtribut,
	deleteExercise,
} from '../../services/exerciseService';
import FormExercise from './NewExercisePage';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Nombre', alignRight: false },
	{ id: 'difficulty', label: 'Dificultad', alignRight: false },
	{ id: 'exerciseType', label: 'Tipo', alignRight: false },
	{ id: 'bodyPart', label: 'Pastes Cuerpos', alignRight: false },
	{ id: 'muscles', label: 'Musculos', alignRight: false },
	{ id: 'equipments', label: 'Equipamiento', alignRight: false },
	{ id: 'video', label: 'Demostración', alignRight: false },
	{ id: '' },
];

// ----------------------------------------------------------------------

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
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [selected, setSelected] = useState([]);
	const [orderBy, setOrderBy] = useState('name');
	const [filterName, setFilterName] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [isLoadingExerciseUS, setIsLoadingExerciseUS] = useState(true);
	const [isLoadingexerciseAtributes, setIsLoadingExcersiceAtributes] =
		useState(true);
	const [exerciseListUS, setexerciseListUS] = useState([]);
	const [exerciseAtributsUS, setExerciseAtributesUS] = useState();

	const [openConfirmationUS, setOpenConfirmationUS] =
		useState(false); /* para el dialogo de confirmación de eliminar ejercicio */

	const [openFormDialogUS, setOpenFormDialogUS] =
		useState(false); /* para abrir el dialog del formulario de ejercicios */
	const [actionToDoInexerciseDialog, setActionToDoInexerciseDialogUS] =
		useState(); /* para saber que accion se realiza con el formulario de ejercicio */
	const [exerciseToDeleteOrEdit, setExerciseToDeleteOrEditUS] =
		useState(''); /* para pasar el ejercicio al formulario de ejercicio */
	const [resultActinDialogUs, setResultActinDialogUS] =
		useState(''); /* para saber el resultado del formulario de ejercicio */

	const [openAlertUS, setOpenAlertUS] = useState(false);
	const [messageAlertUS, setMessageAlertUS] = useState('');
	const [severityAlertUS, setSeverityAlertUS] = useState('success');

	const [renderUS, setRenderizadoUS] = useState(false);

	const [actionUS, setActionUS] = useState();

	const { action } = props;

	useEffect(() => {
		switch (actionUS) {
			case undefined:
			case 'listExercise':
				setActionUS('listExercise');
				break;
			case 'selectExercise':
				setActionUS('selectExercise');
				break;
			default:
				break;
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

	const handleOpenMenu = id => event => {
		setOpenUS({ _id: id, target: event.currentTarget });
	};

	const handleCloseMenu = () => {
		setOpenUS(null);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelecteds = exerciseListUS.map(n => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setPage(0);
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	const handleFilterByName = event => {
		setPage(0);
		setFilterName(event.target.value);
	};

	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - exerciseListUS.length)
			: 0;

	const filteredPatients = applySortFilter(
		exerciseListUS,
		getComparator(order, orderBy),
		filterName
	);

	const isNotFound = !filteredPatients.length && !!filterName;

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
		switch (actionToDoInexerciseDialog) {
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
							exercise: exerciseToDeleteOrEdit,
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
							exercise: exerciseToDeleteOrEdit,
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
			const responseSave = await deleteExercise(exerciseToDeleteOrEdit);
			if (responseSave.status === 200) {
				setMessageAlertUS('Se elimino el ejercicio');
				setSeverityAlertUS('success');
				setOpenAlertUS(true);
				setOpenConfirmationUS(false);
				setOpenUS(null);
				setExerciseToDeleteOrEditUS('');
			} else {
				setMessageAlertUS('No se pudo eliminar el ejercicio');
				setSeverityAlertUS('error');
				setOpenAlertUS(true);
				setOpenConfirmationUS(false);
				setOpenUS(null);
				setExerciseToDeleteOrEditUS('');
			}
		} else if (event.target.value === 'cancelar') {
			setOpenConfirmationUS(false);
			setExerciseToDeleteOrEditUS();
			setOpenUS(null);
			setExerciseToDeleteOrEditUS('');
		}

		if (renderUS) {
			setRenderizadoUS(false);
		} else {
			setRenderizadoUS(true);
		}
	};

	const getTitle = () => {
		switch (actionUS) {
			case 'selectExercise':
				return 'Seleccionar ejercicio';
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
						<UserListToolbar
							numSelected={selected.length}
							filterName={filterName}
							onFilterName={handleFilterByName}
						/>

						<Scrollbar>
							<TableContainer sx={{ minWidth: 800 }}>
								<Table>
									<UserListHead
										order={order}
										orderBy={orderBy}
										headLabel={TABLE_HEAD}
										rowCount={exerciseListUS.length}
										numSelected={selected.length}
										onRequestSort={handleRequestSort}
										onSelectAllClick={handleSelectAllClick}
									/>
									<TableBody>
										{filteredPatients
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
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
												const selectedExercise = selected.indexOf(name) !== -1;

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
																onChange={event => handleClick(event, name)}
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
															<strong>&quot;{filterName}&quot;</strong>.
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
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Card>
				</Container>

				<Popover
					/* open={Boolean(openUS.target)} */
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
		return <h1>CARGANDO</h1>;
	}
}
