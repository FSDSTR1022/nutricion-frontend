/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	OutlinedInput,
	Chip,
	Button,
	Grid,
	Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme, styled  } from '@mui/material/styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ConstructionOutlined } from '@mui/icons-material';
import {
	getExerciseAtribut,
	saveExercise,
	updateExercise,
} from '../../services/exerciseService';

const FormExercise = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [exerciseAtributsUS, setExerciseAtributesUS] = useState([]);
	const [exerciseNameUS, setExerciseNameUS] = useState();
	const [exerciseTypeUS, setExerciseTypeUS] = useState('');
	const [exerciseDifficultUS, setExerciseDifficultUS] = useState('');
	const [exerciseBodyPartsUS, setExcersiseBodyPartsUS] = useState([]);
	const [exerciseEquipmentsUS, setExerciseEquipmentsUS] = useState([]);
	const [exerciseMuclesUS, setExerciseMuclesUS] = useState([]);
	const [exerciseExplanationUS, setExerciseExplanationUS] = useState();
	const [exercisePrecautionsUS, setExercisePrecautionsUS] = useState();
	const [imagenEjercicio, setImagenEjercicio] = useState();
	const [videoEjercicio, setVideoEjercicio] = useState();

	const [errorsUS, setErrorsUS] = useState({});

	const [actionUS, setActionUS] = useState("newExercise");
	const [excerciseToEditODeleteUS, setExcerciseToEditODeleteUS] = useState();

	const { action, exercisesToAdd, setexerciseToAdd } = props;

	const { state } = useLocation(); // hook para la navegacion

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
			setActionUS('newexercise');
		} else {
			setActionUS(action);
		}

		getExerciseAtribut().then(data => {
			setExerciseAtributesUS(data);
			setIsLoading(false);
		});

		switch (action) {
			case 'newexercise':
				console.log('newexercise');
				break;
			case 'editexercise':
				console.log('editexercise');

				if (state.excercise !== undefined) {
					setExcerciseToEditODeleteUS(state.excercise);
		
					setExerciseNameUS(state.excercise.name);
					setExerciseTypeUS(state.excercise.exerciseType._id);
					setExerciseDifficultUS(state.excercise.difficulty._id);
					setExcersiseBodyPartsUS(
						state.excercise.bodyParts.map(part => {
							return part._id;
						})
					);
					setExerciseMuclesUS(
						state.excercise.muscles.map(part => {
							return part._id;
						})
					);
					setExerciseEquipmentsUS(
						state.excercise.equipments.map(part => {
							return part._id;
						})
					);
					setExerciseNameUS(state.excercise.name);
					setExerciseExplanationUS(state.excercise.explanation);
					setExercisePrecautionsUS(state.excercise.precautions);
				}

				break;
			default:
				break;
		}
	},);

	const handleChangeExerciseNameInput = event => {
		setExerciseNameUS(event.target.value);
	};

	const handleChangeExerciseType = event => {
		setExerciseTypeUS(event.target.value);
	};

	const handleChangeExerciseDificultSelector = event => {
		setExerciseDifficultUS(event.target.value);
	};

	const handleChangeBodyPartSelector = event => {
		const {
			target: { value },
		} = event;

		setExcersiseBodyPartsUS(
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleChangeEquipamiento = event => {
		const {
			target: { value },
		} = event;
		setExerciseEquipmentsUS(
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleChangeMuscleSelector = event => {
		const {
			target: { value },
		} = event;
		setExerciseMuclesUS(typeof value === 'string' ? value.split(',') : value);
	};

	const handleChangeExplanationInput = event => {
		setExerciseExplanationUS(event.target.value);
	};

	const handleChangePrecautionsInput = event => {
		setExercisePrecautionsUS(event.target.value);
	};

	const handleClickSaveButton = () => {
		checkForm();

		const exerciseToSave = {};

		exerciseToSave.name = exerciseNameUS;
		exerciseToSave.exerciseType = exerciseTypeUS;
		exerciseToSave.difficulty = exerciseDifficultUS;
		exerciseToSave.bodyParts = exerciseBodyPartsUS;
		exerciseToSave.muscles = exerciseMuclesUS;
		exerciseToSave.equipments = exerciseEquipmentsUS;
		exerciseToSave.explanation = exerciseExplanationUS;
		exerciseToSave.precautions = exercisePrecautionsUS;
		exerciseToSave.photo =
			'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6';
		exerciseToSave.video =
			'https://lh5.googleusercontent.com/LM0t4lybG4VsUyKDbDizCDZEA6y2ZeRBIqRw4RMFM8-ggC5cFhphukFT-h24CWqwycbNcvVutbJeGlueYS4zwVmBzJVyiaz-QHbRCufuJJKe8_5SEVROgxGAKk9YlzyGlxBFX-Uyl0CIxObBSXxvow';

		
		switch (actionUS) {
			case 'newExercise':
				saveExercise(exerciseToSave);
				navigate('/Ejercicios');
				break;
			case 'editExercise':
				exerciseToSave._id = excerciseToEditODeleteUS._id;
				updateExercise(exerciseToSave);
				navigate('/Ejercicios');
				break;
			default:
					break
		}		
	};

	const checkForm = () => {
		if (exerciseNameUS === undefined || exerciseNameUS === '') {
			errorsUS.ExcersiceName = true;
		}
	};

	function getStylesItemSelector(name, partesCuerpo, theme) {
		return {
			fontWeight:
				partesCuerpo.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

	const Item = styled(Paper)(({ theme }) => ({
		/*  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', */
		/*  ...theme.typography.body2,  */
		padding: theme.spacing(2),
		/* textAlign: 'center', */
		/*  color: theme.palette.text.secondary  */
	}));

	const getTitle = () => {
	
		switch (actionUS) {
			case 'newexercise':
				return <h1>Nuevo Ejercicio</h1>;
			case 'editexercise':
				return <h1>Modificar Ejercicio</h1>;
			default:
				return <></>;
		}
	}

	if (!isLoading) {
		return (
			<div>
				{getTitle()}
				<form>
					{/* Campo ejercicio */}
					<FormControl
						fullWidth
						sx={{ m: 1 }}>
						<TextField
							id='standard-basic'
							label='Nombre Ejercicio'
							variant='outlined'
							required
							errro={errorsUS.ExcersiceName}
							value={exerciseNameUS}
							onChange={handleChangeExerciseNameInput}
						/>
						{errorsUS.ExcersiceName ? (
							<span style={{ color: 'red' }}>Este campo es obligatorio</span>
						) : (
							<span><></></span>
						)}
						
					</FormControl>

					{/* Selectot Tipo Ejercicio */}
					<FormControl
						required
						fullWidth
						sx={{ m: 1 }}>
						<InputLabel id='tipoEjercicioSelectLabel'>
							{' '}
							Tipo de Ejercicio{' '}
						</InputLabel>
						<Select
							labelId='tipoEjercicioSelectLabel'
							id='tipoEjercicioSelect'
							value={exerciseTypeUS}
							label='Dificultad'
							onChange={handleChangeExerciseType}>
							{exerciseAtributsUS.exerciseType.map((te, id) => (
								<MenuItem
									value={te._id}
									key={id}>
									{te.exerciseType}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Selector Dificultad Ejercicio */}
					<FormControl
						required
						fullWidth
						sx={{ m: 1 }}>
						<InputLabel id='dificultadEjercicioSelectLabel'>
							Dificultad de Ejercicio
						</InputLabel>
						<Select
							labelId='dificultadEjercicioSelectLabel'
							id='dificultadEjercicioSelect'
							value={exerciseDifficultUS}
							label='Dificultad Ejercicio'
							onChange={handleChangeExerciseDificultSelector}>
							{exerciseAtributsUS.exerciseDifficult.map((de, id) => (
								<MenuItem
									value={de._id}
									key={id}>
									{de.exerciseDifficulty}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Selector partes cuerpo */}
					<FormControl
						required
						fullWidth
						sx={{ m: 1 }}>
						<InputLabel id='demo-multiple-chip-label'>
							{' '}
							Parte del Cuerpo Involucradas{' '}
						</InputLabel>
						<Select
							labelId='demo-multiple-chip-label'
							id='demo-multiple-chip'
							multiple
							value={exerciseBodyPartsUS}
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
											label={exerciseAtributsUS.bodyParts.map(body => {
												if (body._id === value) return body.bodyPart;
											})}
										/>
									))}
								</Box>
							)}
							MenuProps={MenuProps}>
							{exerciseAtributsUS.bodyParts.map(part => (
								<MenuItem
									key={part._id}
									value={part._id}
									style={getStylesItemSelector(
										part._id,
										exerciseBodyPartsUS,
										theme
									)}>
									{part.bodyPart}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					

					{/* Selector musculos Ejercicio */}
					<FormControl
						required
						fullWidth
						sx={{ m: 1 }}>
						<InputLabel id='imputLabelMusculosEjercicio'>
							Musculos Involucrados
						</InputLabel>
						<Select
							labelId='imputLabelMusculosEjercicio'
							id='selectorMusculosEjercicio'
							multiple
							value={exerciseMuclesUS}
							onChange={handleChangeMuscleSelector}
							input={
								<OutlinedInput
									id='OutlinedInputMusculos'
									label='Musculos'
								/>
							}
							renderValue={selected => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map(value => (
										<Chip
											key={value}
											label={exerciseAtributsUS.exerciseMucles.map(muscle => {
												if (muscle._id === value) return muscle.muscle;
											})}
										/>
									))}
								</Box>
							)}
							MenuProps={MenuProps}>
							{exerciseAtributsUS.exerciseMucles.map(muscle => (
								<MenuItem
									key={muscle._id}
									value={muscle._id}
									style={getStylesItemSelector(
										muscle._id,
										exerciseMuclesUS,
										theme
									)}>
									{muscle.muscle}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					

					<FormControl
						required
						fullWidth
						sx={{ m: 1 }}>
						<InputLabel id='demo-multiple-chip-label2'>Equipamiento</InputLabel>
						<Select
							labelId='demo-multiple-chip-label2'
							id='demo-multiple-chip2'
							multiple
							value={exerciseEquipmentsUS}
							onChange={handleChangeEquipamiento}
							input={
								<OutlinedInput
									id='select-multiple-chip2'
									label='Equipamiento'
								/>
							}
							renderValue={selected => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{selected.map(value => (
										<Chip
											key={value}
											label={exerciseAtributsUS.exerciseEquipments.map(
												equipment => {
													if (equipment._id === value)
														return equipment.exerciseEquipment;
												}
											)}
										/>
									))}
								</Box>
							)}
							MenuProps={MenuProps}>
							{exerciseAtributsUS.exerciseEquipments.map(equipment => (
								<MenuItem
									key={equipment._id}
									value={equipment._id}
									style={getStylesItemSelector(
										equipment._id,
										exerciseEquipmentsUS,
										theme
									)}>
									{equipment.exerciseEquipment}
								</MenuItem>
							))}
						</Select>
					</FormControl>



					<FormControl
						fullWidth
						sx={{ m: 1 }}>
						<p>Detalle la explicación para realizar el ejercicio</p>
						<TextField
							id='explicaciónEjercicio'
							label='Explicación Ejercicio'
							multiline
							rows={5}
							value={exerciseExplanationUS}
							onChange={handleChangeExplanationInput}
						/>
					</FormControl>


					<FormControl
						fullWidth
						sx={{ m: 1 }}>
						<p>
							Especifique las precauciones a tener en cuenta al momento de
							realizar el ejercicio{' '}
						</p>
						<TextField
							id='explicaciónEjercicio'
							label='Explicación Ejercicio'
							multiline
							rows={5}
							value={exercisePrecautionsUS}
							onChange={handleChangePrecautionsInput}
						/>
					</FormControl>
					<br />
					<br />


					<Box sx={{ flexGrow: 1 }}>
						<Grid
							container
							spacing={2}>
							<Grid>
								<Item>
									<img
										src={`https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format`}
										srcSet={`https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
										alt={'Hats'}
										loading='lazy'
									/>
									<br />
									<Button
										id='imagenButton'
										variant='contained'
										component='label'>
										Cargar Imagen
										<input
											hidden
											accept='image/*'
											multiple
											type='file'
										/>
									</Button>
								</Item>
							</Grid>
							<Grid>
								<Grid>
									<Item>
										<img
											src={`https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format`}
											srcSet={`https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
											alt={'Hats'}
											loading='lazy'
										/>
										<br />
										<Button
											id='videoButton'
											variant='contained'
											component='label'>
											Cargar Video
											<input
												hidden
												accept='image/*'
												multiple
												type='file'
											/>
										</Button>
									</Item>
								</Grid>
							</Grid>
						</Grid>
					</Box>

				

					<Button
						variant='contained'
						onClick={() => {
							handleClickSaveButton();
						}}>
						Guardar Ejercicio
					</Button>
				</form>
			</div>
		);
	} 
	else {
		return <h1>CARGANDO</h1>;
	}
};

export default FormExercise;
