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
	ImageListItem
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

import { getAllUsers } from '../../services/userService';
import { getExercise, getExerciseAtribut } from '../../services/exerciseService';

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

export default function ExerciseListPage() {
	const [open, setOpen] = useState(null);
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [selected, setSelected] = useState([]);
	const [orderBy, setOrderBy] = useState('name');
	const [filterName, setFilterName] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [isLoadingExerciseUS, setIsLoadingExerciseUS] =useState(true); 
	const [isLoadingexerciseAtributes, setIsLoadingExcersiceAtributes] = useState(true);
	const [exerciseListUS, setexerciseListUS] = useState([]);
	const [exerciseAtributsUS, setExerciseAtributesUS] = useState();

	useEffect(() => {
		if (exerciseListUS.length === 0) {
			
			const getExe = async () => {
				const responseExercise = await getExercise();
				if (responseExercise.status === 200) {
					console.log("response.data: ",responseExercise.data)
					setexerciseListUS(responseExercise.data);
					setIsLoadingExerciseUS(false);
				}
			};

			const getEA =async ()=>{
				const response = await getExerciseAtribut()
				if(response.status===200)
				{
					console.log("Exercises Atribut: ",response.data)
					setExerciseAtributesUS(response.data);
					setIsLoadingExcersiceAtributes(false);
				}			
			}
			getEA()
			getExe();
			
		}
	},);


	const handleOpenMenu = event => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
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

	if (!isLoadingExerciseUS && !isLoadingexerciseAtributes)  {
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
							Ejercicios
						</Typography>
						<Button
							variant='contained'
							startIcon={<Iconify icon='eva:plus-fill' />}>
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
												const { _id,name, difficulty, exerciseType, bodyParts, muscles, equipments, photo, video} = row;
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
																onClick={handleOpenMenu}>
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
					open={Boolean(open)}
					anchorEl={open}
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
					<MenuItem>
						<Iconify
							icon={'eva:edit-fill'}
							sx={{ mr: 2 }}
						/>
						Modificar
					</MenuItem>

					<MenuItem sx={{ color: 'error.main' }}>
						<Iconify
							icon={'eva:trash-2-outline'}
							sx={{ mr: 2 }}
						/>
						Borrar
					</MenuItem>
				</Popover>
			</>
		);
	} else {
		return <h1>CARGANDO</h1>;
	}
}
