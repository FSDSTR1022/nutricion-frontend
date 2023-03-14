/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Snackbar,
	Alert,
	CircularProgress,
	Box,
} from '@mui/material';
import Label from '../../components/label';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import {
	UserListHead,
	UserListToolbar,
} from '../../sections/@dashboard/exercise';

import { getAllUsers, updateUser } from '../../services/userService';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Nombre', alignRight: false },
	{ id: 'lastName', label: 'Apellido', alignRight: false },
	{ id: 'phone', label: 'Teléfono', alignRight: false },
	{ id: 'dni', label: 'DNI', alignRight: false },
	{ id: 'email', label: 'Correo', alignRight: false },
	{ id: 'status', label: 'Estado', alignRight: false },
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

export default function PatientPage() {
	const [openUS, setOpenUS] = useState(null);
	const [pageUS, setPageUS] = useState(0);
	const [orderUS, setOrderUS] = useState('asc');
	const [selectedUS, setSelectedUS] = useState([]);
	const [orderByUS, setOrderByUS] = useState('name');
	const [filterNameUS, setFilterNameUS] = useState('');
	const [rowsPerPage, setRowsPerPageUS] = useState(5);

	const [isLoadingPatientsUS, setIsLoadingPatientsUS] = useState(true);
	const [patientsListUS, setPatientListUS] = useState([]);
	const [openConfirmationUS, setOpenConfirmationUS] = useState(false);
	const [patientToDeleteOrEditUS, setPatientToDeleteOrEditUS] = useState('');

	const [openAlertUS, setOpenAlertUS] = useState(false);
	const [messageAlertUS, setMessageAlertUS] = useState('');
	const [severityAlertUS, setSeverityAlertUS] = useState('success');

	const navigate = useNavigate();

	useEffect(() => {
		const getAllusers = async () => {
			const response = await getAllUsers();
			if (response.status === 200) {
				setPatientListUS(response.data);
				setIsLoadingPatientsUS(false);
			}
		};
		getAllusers();
	}, []);

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
		if (event.target.checked) {
			const newSelecteds = patientsListUS.map(n => n.name);
			setSelectedUS(newSelecteds);
			return;
		}
		setSelectedUS([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selectedUS.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedUS, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedUS.slice(1));
		} else if (selectedIndex === selectedUS.length - 1) {
			newSelected = newSelected.concat(selectedUS.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedUS.slice(0, selectedIndex),
				selectedUS.slice(selectedIndex + 1)
			);
		}
		setSelectedUS(newSelected);
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

	const handleClickDelteExercise = (event, id) => {
		const excersiceToDelete = patientsListUS.find(
			exercise => exercise._id === id
		);

		setPatientToDeleteOrEditUS(excersiceToDelete);
		setOpenConfirmationUS(true);
		setOpenUS(null);
	};

	const handleClickAceptDelteExercise = async event => {
		if (event.target.value === 'aceptar') {
			const patient = patientToDeleteOrEditUS;
			patient.isActive = false;

			const responseSave = await updateUser(patient);
			if (responseSave.status === 200) {
				console.log('se dio de baja');
				console.log('responseSave: ', responseSave);
				setMessageAlertUS('Se dio de baja al paciente');
				setSeverityAlertUS('success');
			} else {
				console.log('NO se dio de baja');
				console.log('responseSave: ', responseSave);
				setMessageAlertUS('No se pudo dar de baja al paciente');
				setSeverityAlertUS('error');
			}
			setMessageAlertUS('Se dio de baja el paciente');
			setOpenAlertUS(true);
			setOpenConfirmationUS(false);
		} else if (event.target.value === 'cancelar') {
			setOpenConfirmationUS(false);
			setPatientToDeleteOrEditUS();
		}
		setOpenUS(null);
		setPatientToDeleteOrEditUS('');
	};

	const emptyRows =
		pageUS > 0
			? Math.max(0, (1 + pageUS) * rowsPerPage - patientsListUS.length)
			: 0;

	const filteredPatients = applySortFilter(
		patientsListUS,
		getComparator(orderUS, orderByUS),
		filterNameUS
	);

	const isNotFound = !filteredPatients.length && !!filterNameUS;

	const handleClickDeltePatient = (event, id) => {
		console.log(`Delte paciente: ${id}`);
		const patientToDelete = patientsListUS.find(
			exercise => exercise._id === id
		);

		setPatientToDeleteOrEditUS(patientToDelete);
		setOpenConfirmationUS(true);
		setOpenUS(null);
	};

	const handleClickViewPatient = (event, id) => {
		navigate(`/dashboard/pacients/${id}`);
		console.log(`Ver paciente: ${id}`);

		/* const excersiceToView = exerciseListUS.find(element => element._id === id);

		setActionToDoInexerciseDialogUS('viewExercise');
		setExerciseToDeleteOrEditUS(excersiceToView);
		setOpenFormDialogUS(true);
		setOpenUS(null); */
	};

	const handleClickEditPatient = (event, id) => {
		console.log(`Ver paciente: ${id}`);
		/* const excersiceToEdit = exerciseListUS.find(element => element._id === id);

		setActionToDoInexerciseDialogUS('editExercise');
		setExerciseToDeleteOrEditUS(excersiceToEdit);
		setOpenFormDialogUS(true);
		setOpenUS(null); */
	};

	const handleCloseMessage = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlertUS(false);
		}
		setOpenAlertUS(false);
	};

	if (!isLoadingPatientsUS) {
		return (
			<>
				<Helmet>
					<title> Pacientes </title>
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
							Pacientes
						</Typography>
						<Button
							variant='contained'
							startIcon={<Iconify icon='eva:plus-fill' />}>
							Nuevo Paciente
						</Button>
					</Stack>

					<Card>
						<UserListToolbar
							numSelected={selectedUS.length}
							filterName={filterNameUS}
							onFilterName={handleFilterByName}
						/>

						<Scrollbar>
							<TableContainer sx={{ minWidth: 800 }}>
								<Table>
									<UserListHead
										order={orderUS}
										orderBy={orderByUS}
										headLabel={TABLE_HEAD}
										rowCount={patientsListUS.length}
										numSelected={selectedUS.length}
										onRequestSort={handleRequestSort}
										onSelectAllClick={handleSelectAllClick}
									/>
									<TableBody>
										{filteredPatients
											.slice(
												pageUS * rowsPerPage,
												pageUS * rowsPerPage + rowsPerPage
											)
											.map(row => {
												const {
													_id,
													name,
													lastName,
													phone,
													dni,
													email,
													imgUrl,
													isActive,
												} = row;
												const selectedPatient = selectedUS.indexOf(name) !== -1;

												return (
													<TableRow
														hover
														key={_id}
														tabIndex={-1}
														role='checkbox'
														selected={selectedPatient}>
														<TableCell padding='checkbox'>
															<Checkbox
																checked={selectedPatient}
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
																	src={imgUrl}
																/>
																<Typography
																	variant='subtitle2'
																	noWrap>
																	{name}
																</Typography>
															</Stack>
														</TableCell>

														<TableCell align='left'>{lastName}</TableCell>

														<TableCell align='left'>{phone}</TableCell>

														<TableCell align='left'>{dni}</TableCell>
														<TableCell align='left'>{email}</TableCell>
														<TableCell align='left'>
															<Label
																color={
																	(isActive === false && 'error') || 'success'
																}>
																{isActive ? 'Activo' : 'No Activo'}
															</Label>
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
							count={patientsListUS.length}
							rowsPerPage={rowsPerPage}
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
							handleClickViewPatient(
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
							handleClickEditPatient(
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
							handleClickDeltePatient(
								event,
								openUS === null ? openUS : openUS._id
							)
						}>
						<Iconify
							icon={'eva:trash-2-outline'}
							sx={{ mr: 2 }}
						/>
						Dar de baja
					</MenuItem>
				</Popover>

				{/* ///////////////////// Dialogo de confirmación  ///////////////////// */}
				<Dialog
					open={openConfirmationUS}
					onClose={handleClickDelteExercise}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle id='alert-dialog-title'>
						{'Dar de baja paciente'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							¿Desea dar de baja al paciente?
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
					<title> Pacientes </title>
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
							Pacientes
						</Typography>
						<Button
							variant='contained'
							startIcon={<Iconify icon='eva:plus-fill' />}>
							Nuevo Paciente
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
