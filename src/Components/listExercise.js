/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import FormExercise from './formExercise';
import {
	getexercise,
	getexerciseAtribut,
	deleteexercise,
} from '../services/exerciseService';
import { useEffect, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Box,
	Chip,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	Paper,
	ImageList,
	ImageListItem,
	Button,
	Alert,
	Snackbar,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	DialogContentText,
	FormControlLabel,
	Checkbox,
} from '@mui/material';

const ExercisesList = props => {
	const [isLoadingexercise, setIsLoadingExcersice] = useState(true);
	const [isLoadingexerciseAtributes, setIsLoadingExcersiceAtributes] =
		useState(true);
	const [exerciseListUS, setexerciseListUS] = useState();
	const [exerciseAtributsUS, setexerciseAtributesUS] = useState([]);
	const [exerciseBodyPartsSearchUS, setExcersiseBodyPartsSearchUS] = useState(
		[]
	);
	const [exerciseTypeSearchUS, setexerciseTypeSearchUS] = useState('');
	const [exerciseDifficulSearchtUS, setexerciseDifficulSearchUS] = useState('');
	const [exerciseMuclesSearchUS, setexerciseMuclesSearchUS] = useState([]);
	const [exerciseEquipmentsSearchUS, setexerciseEquipmentsSearchUS] = useState(
		[]
	);
	const [exerciseNameSeachUS, setexerciseNameSearchUS] = useState('');

	const [openConfirmationUS, setOpenConfirmationUS] =
		useState(false); /* para el dialogo de confirmación de eliminar ejercicio */

	const [openFormDialogUS, setOpenFormDialogUS] =
		useState(false); /* para abrir el dialog del formulario de ejercicios */
	const [actionToDoInexerciseDialog, setActionToDoInexerciseDialog] =
		useState(); /* para saber que accion se realiza con el formulario de ejercicio */
	const [exerciseToDeleteOrEdit, setexerciseToDeleteOrEdit] =
		useState(''); /* para pasar el ejercicio al formulario de ejercicio */
	const [resultActinDialog, setResultActinDialog] =
		useState(); /* para saber el resultado del formulario de ejercicio */

	const [openAlertUS, setOpenAlertUS] = useState(false);
	const [messageAlertUS, setMessageAlertUS] = useState('');
	const [severityAlertUS, setSeverityAlertUS] = useState('');

	const [actionUS, setActionUS] = useState(
		{}
	); /*  para saber la accion que se va a realizar con el listado */

	/*   const [exerciseListToAddRoutineUS, setexerciseListToAddRoutineUS] = useState([]) */

	/* const [exerciseRepSegUS, setexerciseRepSegUS] = useState([]);  para el campo repeticines/tiempo */

	/* const [exercisesSelectUS, setexercisesSelectUS] = useState(false);  -> para saber los ejercicios selesccionados con los checks */

	const [renderUS, setRenderizadoUS] = useState(false);

	const { action, exercisesToAdd, setexerciseToAdd } = props;

	const navigate = useNavigate();

	const theme = useTheme();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	useEffect(() => {
		if (action === undefined) {
			setActionUS('listexercise');
		} else {
			setActionUS(action);
		}

		switch (action) {
			case 'listexercise':
				console.log('listexercise');
				break;
			case 'selectexercise':
				console.log('selectexercise');
				break;
			default:
				break;
		}

		getexerciseAtribut().then(data => {
			setexerciseAtributesUS(data);
			setIsLoadingExcersiceAtributes(false);
		});

		getexercise().then(data => {
			setexerciseListUS(data);
			setIsLoadingExcersice(false);
		});

		if (resultActinDialog === 'saveSuccessfully') {
			setOpenAlertUS(true);
			setMessageAlertUS('Se guardo el ejercicio correctamente');
			setSeverityAlertUS('success');
		} else if (resultActinDialog === 'modifiedSuccessfully') {
			setOpenAlertUS(true);
			setMessageAlertUS('Se modifico el ejercicio correctamente');
			setSeverityAlertUS('success');
		}
	}, [resultActinDialog]);

	useEffect(() => {}, [renderUS]);

	const handleClickNewexerciseDialogButton = event => {
		setActionToDoInexerciseDialog('newexercise');
		setOpenFormDialogUS(true);
	};

	const handleClickView = evento => {
		const excersiceToView = exerciseListUS.find(element => {
			return element._id === evento;
		});

		/* navigate("/Ejercicios/Ejercicio",
      {state:{action:"editexercise",exercise:e}
    }   
    ) */

		setActionToDoInexerciseDialog('viewexercise');
		setexerciseToDeleteOrEdit(excersiceToView);
		setOpenFormDialogUS(true);
	};

	const handleClickEditexercise = evento => {
		const excersiceToEdit = exerciseListUS.find(element => {
			return element._id === evento;
		});

		/*  navigate("/Ejercicios/Ejercicio",
      {state:{action:"editexercise",exercise:excersiceToEdit}
    }   
    )  */

		setActionToDoInexerciseDialog('editexercise');
		setexerciseToDeleteOrEdit(excersiceToEdit);
		setOpenFormDialogUS(true);
	};

	const handleClickDelteexercise = evento => {
		const excersiceToDelete = exerciseListUS.find(exercise => {
			return exercise._id === evento;
		});

		setexerciseToDeleteOrEdit(excersiceToDelete);
		setOpenConfirmationUS(true);
	};

	const handleClickAceptDelteExercise = event => {
		if (event.target.value === 'aceptar') {
			deleteexercise(exerciseToDeleteOrEdit)
				.then(response => {
					if (response.status === 200) {
						setMessageAlertUS('Se elimino el ejercicio');
						setSeverityAlertUS('success'); /* "success":"error" */
						setOpenAlertUS(true);
					} else {
						setMessageAlertUS('No se pudo eliminar el ejercicio');
						setSeverityAlertUS('success'); /* "success":"error" */
						setOpenAlertUS(true);
					}
				})
				.catch(error => {
					setMessageAlertUS('No se pudo eliminar el ejercicio' + error);
					setSeverityAlertUS('error'); /* "success":"error" */
					setOpenAlertUS(true);
				});

			setOpenConfirmationUS(false);

			// eslint-disable-next-line no-useless-return
			return;
		} else if (event.target.value === 'cancelar') {
			setOpenConfirmationUS(false);
			setexerciseToDeleteOrEdit();
			// eslint-disable-next-line no-useless-return
			return;
		}
	};

	const handleChangeexerciseNameInput = event => {
		setexerciseNameSearchUS(event.target.value);

		if (event.target.value === '') {
			// eslint-disable-next-line no-useless-return, array-callback-return
			exerciseListUS.map(exercise => {
				exercise.show = true;
			});
		} else {
			// eslint-disable-next-line no-useless-return, array-callback-return
			exerciseListUS.map(exercise => {
				if (exercise.name.includes(event.target.value)) {
					exercise.show = true;
				} else {
					exercise.show = false;
				}
			});
		}
	};

	const handleChangeexerciseTypeSearch = event => {
		setexerciseTypeSearchUS(event.target.value);

		if (event.target.value === 'quitarSeleccion') {
			// eslint-disable-next-line array-callback-return
			exerciseListUS.map(exercise => {
				exercise.show = true;
			});

			setexerciseTypeSearchUS('');
		} else {
			// eslint-disable-next-line array-callback-return
			exerciseListUS.map(exercise => {
				if (exercise.exerciseType.exerciseType === event.target.value) {
					exercise.show = true;
				} else {
					exercise.show = false;
				}
			});
		}
	};

	const handleChangeexerciseDificultSelector = event => {
		setexerciseDifficulSearchUS(event.target.value);

		if (event.target.value === 'quitarSeleccion') {
			// eslint-disable-next-line array-callback-return
			exerciseListUS.map(exercise => {
				exercise.show = true;
			});

			setexerciseDifficulSearchUS('');
		} else {
			// eslint-disable-next-line array-callback-return
			exerciseListUS.map(exercise => {
				if (exercise.difficulty.exerciseDifficulty === event.target.value) {
					exercise.show = true;
				} else {
					exercise.show = false;
				}
			});
		}
	};

	const handleChangeBodyPartSelector = event => {
		const quitarSeleccion = event.target.value.some(valor => {
			return valor === 'quitarSeleccion';
		});

		if (quitarSeleccion || event.target.value.length === 0) {
			// eslint-disable-next-line array-callback-return
			exerciseListUS.map(exercise => {
				exercise.show = true;
			});

			setExcersiseBodyPartsSearchUS([]);
		} else {
			const {
				target: { value },
			} = event;
			setExcersiseBodyPartsSearchUS(
				typeof value === 'string' ? value.split(',') : value
			);

			// eslint-disable-next-line array-callback-return
			exerciseListUS.map(exercise => {
				const mostrarEjercicio = exercise.bodyParts.some(part => {
					return event.target.value.some(valor => {
						return part.bodyPart === valor;
					});
				});

				if (mostrarEjercicio) {
					exercise.show = true;
				} else {
					exercise.show = false;
				}
			});
		}
	};

	const handleChangeMuscleSelector = event => {
		const quitarSeleccion = event.target.value.some(valor => {
			return valor === 'quitarSeleccion';
		});

		if (quitarSeleccion || event.target.value.length === 0) {
			// eslint-disable-next-line array-callback-return
			exerciseListUS.map(exercise => {
				exercise.show = true;
			});

			setexerciseMuclesSearchUS([]);
		} else {
			const {
				target: { value },
			} = event;
			setexerciseMuclesSearchUS(
				typeof value === 'string' ? value.split(',') : value
			);

			exerciseListUS.map(exercise => {
				const mostrarEjercicio = exercise.muscles.some(muscle => {
					return event.target.value.some(valor => {
						return muscle.muscle === valor;
					});
				});

				if (mostrarEjercicio) {
					exercise.show = true;
				} else {
					exercise.show = false;
				}
			});
		}
	};

	const handleChangeEquipamiento = event => {
		const quitarSeleccion = event.target.value.some(valor => {
			return valor === 'quitarSeleccion';
		});

		if (quitarSeleccion || event.target.value.length === 0) {
			exerciseListUS.map(exercise => {
				exercise.show = true;
			});

			setexerciseEquipmentsSearchUS([]);
		} else {
			const {
				target: { value },
			} = event;
			setexerciseEquipmentsSearchUS(
				typeof value === 'string' ? value.split(',') : value
			);

			exerciseListUS.map(exercise => {
				const mostrarEjercicio = exercise.equipments.some(equipment => {
					return event.target.value.some(valor => {
						return equipment.exerciseEquipment === valor;
					});
				});

				if (mostrarEjercicio) {
					exercise.show = true;
				} else {
					exercise.show = false;
				}
			});
		}
	};

	const handleCloseMessage = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlertUS(false);
		}
		setOpenAlertUS(false);
	};

	const handleClickOpenBoton = () => {
		setOpenConfirmationUS(true);
	};

	function getStylesItemSelector(name, partesCuerpo, theme) {
		return {
			fontWeight:
				partesCuerpo.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

	const handleChangeSelectexerciseCheckbox = event => {
		if (event.target.checked) {
			const excerToAdd = exerciseListUS.find(
				excersice => excersice._id === event.target.value
			);
			const arrayEjercicios = exercisesToAdd;
			arrayEjercicios.push({ exercise: excerToAdd });
			setexerciseToAdd(arrayEjercicios);
		} else {
			const array = exercisesToAdd;
			const arrayLimpio = array.filter(
				element => element.exercise._id !== event.target.value
			);
			setexerciseToAdd(arrayLimpio);
		}

		/* para que vuelva a renderizar */
		if (renderUS) {
			setRenderizadoUS(false);
		} else {
			setRenderizadoUS(true);
		}
	};

	const handleChangeexerciseRepSegTexField = exerciseId => event => {
		const resultado = exercisesToAdd.find(
			element => element.exercise._id === exerciseId
		);

		resultado.timeOReps = event.target.value;

		if (renderUS) {
			setRenderizadoUS(false);
		} else {
			setRenderizadoUS(true);
		}
	};

	const getTableHead = () => {
		const tableCell = (
			<>
				<TableCell> Nombre Ejercicio</TableCell>
				<TableCell align='center'>Tipo de Ejercicio</TableCell>
				<TableCell align='center'>Dificultad</TableCell>
				<TableCell align='center'>Partes del Cuerpo</TableCell>
				<TableCell align='center'>Musculos Involucrados</TableCell>
				<TableCell align='center'>Equipamiento</TableCell>
			</>
		);

		if (actionUS === 'listexercise') {
			return (
				<TableRow>
					{tableCell}
					<TableCell align='center'>Explicación</TableCell>
					<TableCell align='center'>Precauciones </TableCell>
					<TableCell align='center'>Demostración</TableCell>
					<TableCell align='center'>Ver</TableCell>
					<TableCell align='center'>Modificar</TableCell>
					<TableCell align='center'>Eliminar</TableCell>
				</TableRow>
			);
		} else if (actionUS === 'selectexercise') {
			return (
				<TableRow>
					{tableCell}
					<TableCell align='center'>Seleccionar</TableCell>
					<TableCell align='center'>Repeticiones/Tiempo </TableCell>
					{/* <TableCell align="center">Equipamiento</TableCell>
      <TableCell align="center">Peso</TableCell> */}
				</TableRow>
			);
		}
	};

	const drawTableRows = exercise => {
		const cells = (
			<>
				<TableCell component='th' scope='row'>
					{exercise.name}{' '}
				</TableCell>
				<TableCell align='center'>
					{exercise.exerciseType.exerciseType}
				</TableCell>
				<TableCell align='center'>
					{exercise.difficulty.exerciseDifficulty}
				</TableCell>
				<TableCell align='center'>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{exercise.bodyParts.map(part => (
							<Chip key={part._id} label={part.bodyPart} />
						))}
					</Box>
				</TableCell>
				<TableCell>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{exercise.muscles.map(muscle => (
							<Chip key={muscle._id} label={muscle.muscle} />
						))}
					</Box>
				</TableCell>
				<TableCell align='center'>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{exercise.equipments.map(equipment => (
							<Chip key={equipment._id} label={equipment.exerciseEquipment} />
						))}
					</Box>
				</TableCell>
			</>
		);

		if (actionUS === 'listexercise') {
			return (
				<TableRow
					key={exercise._id}
					hover={true}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
					{cells}
					<TableCell align='center'>{exercise.explanation}</TableCell>
					<TableCell align='center'>{exercise.precautions}</TableCell>
					<TableCell align='center'>
						{
							<ImageList
								sx={{ width: 250, height: 100 }}
								cols={2}
								rowHeight={100}
							>
								<ImageListItem key={'photo:' + exercise._id}>
									<img
										src={exercise.photo}
										srcSet={exercise.photo}
										alt={'Foto'}
										loading='Cargando...'
									/>
								</ImageListItem>
								<ImageListItem key={'video:' + exercise._id}>
									<img
										src={exercise.video}
										srcSet={exercise.video}
										alt={'Video'}
										loading='Cargando...'
									/>
								</ImageListItem>
							</ImageList>
						}
					</TableCell>
					{getIconsRow(exercise)}
				</TableRow>
			);
		} else if (actionUS === 'selectexercise') {
			return (
				<TableRow
					key={exercise._id}
					hover={true}
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
					{cells}
					{getIconsRow(exercise)}
					<TableCell align='center'>
						<FormControl sx={{ m: 1, minWidth: 50 }} value={exercise._id}>
							<TextField
								id='standard-basic'
								label='Repeticiones / tiempo'
								variant='outlined'
								disabled={
									!exercisesToAdd.some(element => {
										return element.exercise._id === exercise._id;
									})
								}
								value={devolverTimeoReps(exercise._id)}
								onChange={handleChangeexerciseRepSegTexField(exercise._id)}
							/>
						</FormControl>
					</TableCell>
				</TableRow>
			);
		}
	};

	const getIconsRow = exercise => {
		if (actionUS === 'listexercise') {
			return (
				<>
					<TableCell align='center'>
						<SearchIcon
							onClick={() =>
								exerciseListUS ? handleClickView(exercise._id) : null
							}
						/>
					</TableCell>
					<TableCell align='center'>
						<EditIcon
							onClick={() =>
								exerciseListUS ? handleClickEditexercise(exercise._id) : null
							}
						/>
					</TableCell>
					<TableCell align='center'>
						<DeleteOutlinedIcon
							onClick={() =>
								exerciseListUS ? handleClickDelteexercise(exercise._id) : null
							}
						/>
					</TableCell>
				</>
			);
		} else if (actionUS === 'selectexercise') {
			return (
				<>
					<TableCell align='center'>
						<FormControlLabel
							label='Seleccionar'
							value={exercise._id}
							control={
								<Checkbox
									onChange={handleChangeSelectexerciseCheckbox}
									checked={exercisesToAdd.some(element => {
										return element.exercise._id === exercise._id;
									})}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							}
						/>
					</TableCell>
				</>
			);
		}
	};

	const getMenuItemQuitarSeleccion = () => {
		return (
			<MenuItem value={'quitarSeleccion'} sx={{ color: 'red' }}>
				Quitar Selección
			</MenuItem>
		);
	};

	const getTitle = () => {
		switch (actionUS) {
			case 'selectexercise':
				return <h1>Seleccionar ejercicio</h1>;
			case 'listexercise':
				return <h1>Listado de Ejercicios</h1>;
		}
	};

	const handleCloseformexerciseDialog = evento => {
		setOpenFormDialogUS(false);
	};

	const getDialogContent = () => {
		switch (actionToDoInexerciseDialog) {
			case 'newexercise':
				return (
					<FormExercise
						action={{
							action: 'newexercise',
							setOpendialog: setOpenFormDialogUS,
							result: setResultActinDialog,
						}}
					/>
				);

			case 'editexercise':
				return (
					<FormExercise
						action={{
							action: 'editexercise',
							exercise: exerciseToDeleteOrEdit,
							setOpendialog: setOpenFormDialogUS,
							result: setResultActinDialog,
						}}
					/>
				);

			case 'viewexercise':
				return (
					<FormExercise
						action={{
							action: 'viewexercise',
							exercise: exerciseToDeleteOrEdit,
							setOpendialog: setOpenFormDialogUS,
							result: setResultActinDialog,
						}}
					/>
				);

			default:
				return <h1>No se puede cargar el formulario</h1>;
		}
	};

	const handleClickMostrarEjercicios = () => {
		console.log(exercisesToAdd);
	};

	const devolverTimeoReps = exerciseId => {
		const a = exercisesToAdd.find(
			element => element.exercise._id === exerciseId
		);

		if (a === undefined) {
			return '';
		} else {
			return a.timeOReps;
		}
	};

	if (!isLoadingexercise && !isLoadingexerciseAtributes) {
		return (
			<div>
				{getTitle()}

				{/* ///////////////////// BOTON NUEVO  ///////////////////// */}
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant='contained' onClick={handleClickMostrarEjercicios}>
						Mostar Ejercicios a agregar
					</Button>
					<Button
						variant='contained'
						onClick={handleClickNewexerciseDialogButton}
					>
						Nuevo Ejercicio Dialogo
					</Button>
				</div>

				{/* ///////////////////// FILTROS  ///////////////////// */}
				<div>
					{/* ///////////////////// FILTRO NOMBRE EJERCICIO ///////////////////// */}
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<TextField
							id='standard-basic'
							label='Nombre Ejercicio'
							variant='outlined'
							value={exerciseNameSeachUS}
							onChange={handleChangeexerciseNameInput}
						/>
					</FormControl>

					{/* ///////////////////// FILTRO TIPO EJERCICIO ///////////////////// */}
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<InputLabel id='tipoEjercicioSelectLabel'>
							{' '}
							Tipo de Ejercicio{' '}
						</InputLabel>
						<Select
							labelId='excersiceTypeSearchSelectLabel'
							id='excersiceTypeSearch'
							value={exerciseTypeSearchUS}
							label='Dificultad'
							onChange={handleChangeexerciseTypeSearch}
							input={
								<OutlinedInput
									id='excersiceTypeSearch'
									label='Tipo de Ejercicio '
								/>
							}
						>
							{exerciseTypeSearchUS.length !== 0
								? getMenuItemQuitarSeleccion()
								: null}
							{exerciseAtributsUS.exerciseType.map((te, id) => (
								<MenuItem value={te.exerciseType} key={id}>
									{te.exerciseType}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* ///////////////////// FILTRO DIFICULTAD ///////////////////// */}
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<InputLabel id='dificultadEjercicioSelectLabel'>
							Dificultad de Ejercicio
						</InputLabel>
						<Select
							labelId='dificultadEjercicioSelectLabel'
							id='dificultadEjercicioSelect'
							value={exerciseDifficulSearchtUS}
							label='Dificultad Ejercicio'
							onChange={handleChangeexerciseDificultSelector}
							input={
								<OutlinedInput
									id='dificultadEjercicioSelect'
									label='Dificultad de Ejercicio'
								/>
							}
						>
							{exerciseDifficulSearchtUS.length !== 0
								? getMenuItemQuitarSeleccion()
								: null}
							{exerciseAtributsUS.exerciseDifficult.map((de, id) => (
								<MenuItem value={de.exerciseDifficulty} key={id}>
									{de.exerciseDifficulty}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* ///////////////////// FILTRO PARTES CUERPO  ///////////////////// */}
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<InputLabel id='demo-multiple-chip-label'>
							{' '}
							Parte del Cuerpo Involucradas{' '}
						</InputLabel>
						<Select
							labelId='demo-multiple-chip-label'
							id='demo-multiple-chip'
							multiple
							value={exerciseBodyPartsSearchUS}
							onChange={handleChangeBodyPartSelector}
							input={
								<OutlinedInput
									id='select-multiple-chip'
									label='Parte del Cuerpo Involucrdas'
								/>
							}
							renderValue={selected => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map(value => (
										<Chip
											key={value}
											label={exerciseAtributsUS.bodyParts.map(part => {
												if (part.bodyPart === value) return part.bodyPart;
											})}
										/>
									))}
								</Box>
							)}
							MenuProps={MenuProps}
						>
							{exerciseBodyPartsSearchUS.length !== 0
								? getMenuItemQuitarSeleccion()
								: null}
							{exerciseAtributsUS.bodyParts.map(part => (
								<MenuItem
									key={part._id}
									value={part.bodyPart}
									style={getStylesItemSelector(
										part.bodyPart,
										exerciseBodyPartsSearchUS,
										theme
									)}
								>
									{part.bodyPart}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* ///////////////////// FILTRO MUSCULOS INVOLUCRADOS ///////////////////// */}
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<InputLabel id='imputLabelMusculosEjercicio'>
							Musculos Involucrados
						</InputLabel>
						<Select
							labelId='imputLabelMusculosEjercicio'
							id='selectorMusculosEjercicio'
							multiple
							value={exerciseMuclesSearchUS}
							onChange={handleChangeMuscleSelector}
							input={
								<OutlinedInput
									id='imputLabelMusculosEjercicio'
									label='Musculos Involucrados'
								/>
							}
							renderValue={selected => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map(value => (
										<Chip
											key={value}
											label={exerciseAtributsUS.exerciseMucles.map(muscle => {
												if (muscle.muscle === value) return muscle.muscle;
											})}
										/>
									))}
								</Box>
							)}
							MenuProps={MenuProps}
						>
							{exerciseMuclesSearchUS.length !== 0
								? getMenuItemQuitarSeleccion()
								: null}
							{exerciseAtributsUS.exerciseMucles.map(muscle => (
								<MenuItem
									key={muscle.muscle}
									value={muscle.muscle}
									style={getStylesItemSelector(
										muscle.muscle,
										exerciseMuclesSearchUS,
										theme
									)}
								>
									{muscle.muscle}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* ///////////////////// FILTRO EQUIPAMIENTO ///////////////////// */}
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<InputLabel id='demo-multiple-chip-label'>Equipamiento</InputLabel>
						<Select
							labelId='demo-multiple-chip-label'
							id='demo-multiple-chip'
							multiple
							value={exerciseEquipmentsSearchUS}
							onChange={handleChangeEquipamiento}
							input={
								<OutlinedInput id='select-multiple-chip' label='Equipamiento' />
							}
							renderValue={selected => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map(value => (
										<Chip
											key={value}
											label={exerciseAtributsUS.exerciseEquipments.map(
												equipment => {
													if (equipment.exerciseEquipment === value)
														return equipment.exerciseEquipment;
												}
											)}
										/>
									))}
								</Box>
							)}
							MenuProps={MenuProps}
						>
							{exerciseEquipmentsSearchUS.length !== 0
								? getMenuItemQuitarSeleccion()
								: null}
							{exerciseAtributsUS.exerciseEquipments.map(equipment => (
								<MenuItem
									key={equipment._id}
									value={equipment.exerciseEquipment}
									style={getStylesItemSelector(
										equipment.exerciseEquipment,
										exerciseEquipmentsSearchUS,
										theme
									)}
								>
									{equipment.exerciseEquipment}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				{/* ///////////////////// TABLA  ///////////////////// */}
				<div>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>{getTableHead()}</TableHead>
							<TableBody>
								{exerciseListUS.map(exercise => {
									if (exercise.show === undefined || exercise.show === true) {
										return drawTableRows(exercise);
									}
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</div>

				{/* ///////////////////// Mensaje de resultado  ///////////////////// */}
				<div>
					<Snackbar
						open={openAlertUS}
						autoHideDuration={6000}
						onClose={handleCloseMessage}
					>
						<Alert
							variant='filled'
							onClose={handleCloseMessage}
							severity={severityAlertUS}
							sx={{ width: '100%' }}
						>
							{messageAlertUS}
						</Alert>
					</Snackbar>
				</div>

				{/* ///////////////////// Dialogo de confirmación  ///////////////////// */}
				<Dialog
					open={openConfirmationUS}
					onClose={handleClickDelteexercise}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>
						{'Eliminar Ejercicio'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							¿Desea eliminar el ejercicio?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button value='aceptar' onClick={handleClickAceptDelteExercise}>
							Aceptar
						</Button>
						<Button value='cancelar' onClick={handleClickAceptDelteExercise}>
							{' '}
							Cancelar{' '}
						</Button>
					</DialogActions>
				</Dialog>

				{/* ///////////////////// Dialogo nuevo ejercicio  ///////////////////// */}
				<div>
					<Dialog
						open={openFormDialogUS}
						onClose={handleCloseformexerciseDialog}
						aria-labelledby='alert-dialog-title'
						aria-describedby='alert-dialog-description'
						/* fullWidth="xl" */
						maxWidth='xl'
					>
						<DialogContent>{getDialogContent()}</DialogContent>
						<DialogActions>
							<Button value='cancelar' onClick={handleCloseformexerciseDialog}>
								{' '}
								Cancelar{' '}
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		);
	} else {
		return <h1>CARGANDO</h1>;
	}
};

export default ExercisesList;
