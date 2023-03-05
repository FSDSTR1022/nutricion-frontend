/* eslint-disable arrow-body-style */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
	Card,
	Stack,
	Paper,
	Avatar,
	Button,
	MenuItem,
	Container,
	Typography,
	Chip,
	Box,
	FormControl,
	TextField,
	Grid,
	Select,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import {
	saveExercise,
	updateExercise,
	getExercise,
	getExerciseAtribut,
} from '../../services/exerciseService';

export default function NewExercisePage(props) {
	const [isLoadingexerciseAtributes, setIsLoadingexerciseAtributes] =
		useState(true);
	const [exerciseAtributsUS, setExerciseAtributesUS] = useState([]);
	const [exerciseNameUS, setExerciseNameUS] = useState();
	const [exerciseTypeUS, setExerciseTypeUS] = useState('');
	const [exerciseDifficultUS, setExerciseDifficultUS] = useState('');
	const [exerciseBodyPartsUS, setExcersiseBodyPartsUS] = useState([]);
	const [exerciseEquipmentsUS, setExerciseEquipmentsUS] = useState([]);
	const [exerciseMuclesUS, setExerciseMuclesUS] = useState([]);
	const [exerciseExplanationUS, setExerciseExplanationUS] = useState('');
	const [exercisePrecautionsUS, setExercisePrecautionsUS] = useState('');
	const [imagenEjercicio, setImagenEjercicio] = useState('');
	const [cloudImgUrl, setCloudImgUrl] = useState('');
	const [videoEjercicio, setVideoEjercicio] = useState('');
	const [cloudVidUrl, setCloudVidUrl] = useState('');
	const [errorsUS, setErrorsUS] = useState({});

	const [actionUS, setActionUS] = useState();
	const [excerciseToEditODeleteUS, setExcerciseToEditODeleteUS] = useState({});

	const { action } = props;

	const navigate = useNavigate();

	const defaultUrlImg =
		'https://res.cloudinary.com/dtnuuoiih/image/upload/v1678038327/exercises/default_upload_image_m6j6gc.png';

	const defaultUrlVid =
		'https://res.cloudinary.com/dtnuuoiih/image/upload/v1678039917/exercises/default_upload_video_ejzncj.jpg';

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
	const Item = styled(Paper)(({ theme }) => ({
		/*  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', */
		/*  ...theme.typography.body2,  */
		padding: theme.spacing(2),
		/* textAlign: 'center', */
		/*  color: theme.palette.text.secondary  */
	}));

	useEffect(() => {
		if (exerciseAtributsUS.length === 0) {
			const getEA = async () => {
				const response = await getExerciseAtribut();
				if (response.status === 200) {
					setExerciseAtributesUS(response.data);
					setIsLoadingexerciseAtributes(false);
				}
			};
			getEA();
		}

		if (action === undefined) {
			setActionUS({ action: 'newExercise', openFrom: 'home' });
		} else {
			setActionUS(action);

			switch (action.action) {
				case 'editExercise':
					if (action.exercise !== undefined) {
						cargarCamposEjercicioAEditar(action.exercise);
					}
					break;
				case 'viewExercise':
					if (action.exercise !== undefined) {
						cargarCamposEjercicioAEditar(action.exercise);
					}
					break;
				default:
					break;
			}
		}
	}, []);

	const cargarCamposEjercicioAEditar = exercise => {
		setExcerciseToEditODeleteUS(exercise);

		setExerciseNameUS(exercise.name);
		setExerciseTypeUS(exercise.exerciseType._id);
		setExerciseDifficultUS(exercise.difficulty._id);
		setExcersiseBodyPartsUS(exercise.bodyParts.map(part => part._id));
		setExerciseMuclesUS(exercise.muscles.map(part => part._id));
		setExerciseEquipmentsUS(exercise.equipments.map(part => part._id));
		setExerciseNameUS(exercise.name);
		setExerciseExplanationUS(exercise.explanation);
		setExercisePrecautionsUS(exercise.precautions);
	};

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

	const handleClickSaveButton = async () => {
		if (checkForm()) {
			const exerciseToSave = {};

			exerciseToSave.name = exerciseNameUS;
			exerciseToSave.exerciseType = exerciseTypeUS;
			exerciseToSave.difficulty = exerciseDifficultUS;
			exerciseToSave.bodyParts = exerciseBodyPartsUS;
			exerciseToSave.muscles = exerciseMuclesUS;
			exerciseToSave.equipments = exerciseEquipmentsUS;
			exerciseToSave.explanation = exerciseExplanationUS;
			exerciseToSave.precautions = exercisePrecautionsUS;
			exerciseToSave.photo = cloudImgUrl;
			exerciseToSave.video = cloudVidUrl;

			switch (actionUS.action) {
				case 'newExercise':
					const responseSave = await saveExercise(exerciseToSave);
					if (responseSave.status === 200) {
						if (actionUS.openFrom === 'listExercise') {
							actionUS.setOpendialog(false);
							actionUS.setMessageAlert('Se guardó correctamente el ejercicio');
							actionUS.openAlert(true);
							actionUS.severityAler('success');
						} else if (
							actionUS.openFrom === 'home' ||
							actionUS.openFrom === 'formExercise'
						) {
							navigate('/dashboard/newexercise', {
								action: {
									action: 'newExercise',
									openFrom: 'formExercise',
									typeMessage: 'saveSuccessfully',
								},
							});
						}
					} else {
						console.log('no se guardo con exito');
					}
					break;

				case 'editExercise':
					exerciseToSave._id = excerciseToEditODeleteUS._id;
					const responseUpdate = await updateExercise(exerciseToSave);
					if (responseUpdate.status === 200) {
						console.log('se actualizo con exito');
						if (actionUS.openFrom === 'listExercise') {
							actionUS.setOpendialog(false);
							actionUS.setMessageAlert(
								'Se actualizó correctamente el ejercicio'
							);
							actionUS.openAlert(true);
							actionUS.severityAler('success');
						}
					} else {
						console.log('no se actualizó con exito');
					}
					break;

				default:
					break;
			}
		}
	};

	const checkForm = () => {
		let errors = true;

		if (exerciseNameUS === undefined || exerciseNameUS === '') {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				excersiceName: true,
			}));

			errors = false;
		}
		if (exerciseTypeUS === undefined || exerciseTypeUS === '') {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				excersiceType: true,
			}));

			errors = false;
		}
		if (exerciseDifficultUS === undefined || exerciseDifficultUS === '') {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				excersiceDificult: true,
			}));

			errors = false;
		}

		if (exerciseBodyPartsUS.length === 0) {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				excersiceBodyParts: true,
			}));

			errors = false;
		}

		if (exerciseMuclesUS.length === 0) {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				excersiceMuscles: true,
			}));

			errors = false;
		}

		if (exerciseEquipmentsUS.length === 0) {
			setErrorsUS(errorsUS => ({
				...errorsUS,
				excersiceEquipment: true,
			}));

			errors = false;
		}

		return errors;
	};

	function getStylesItemSelector(name, partesCuerpo, theme) {
		return {
			fontWeight:
				partesCuerpo.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

	const getTitle = () => {
		switch (actionUS.action) {
			case 'newExercise':
				return 'Nuevo Ejercicio';
			case 'editExercise':
				return 'Modificar Ejercicio';
			case 'viewExercise':
				return 'Ejercicio';
			default:
				return <></>;
		}
	};

	// subir imagen /////////////////////////

	const upLoadImage = image => {
		setImagenEjercicio(image);
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'x12akkid');
		data.append('cloud_name', 'dtnuuoiih');
		data.append('folder', 'exercises/image');
		fetch('https://api.cloudinary.com/v1_1/dtnuuoiih/image/upload/', {
			method: 'post',
			body: data,
		})
			.then(res => res.json())
			.then(data => {
				console.log('url devuelta = ', data);
				setCloudImgUrl(data.url);
				return data.url;
			})
			.catch(err => console.log('error', err));
	};
	// subir video /////////////////////////

	const upLoadVideo = video => {
		setVideoEjercicio(video);
		const data = new FormData();
		data.append('file', video);
		data.append('upload_preset', 'x12akkid');
		data.append('cloud_name', 'dtnuuoiih');
		data.append('folder', 'exercises/gifs');
		fetch('https://api.cloudinary.com/v1_1/dtnuuoiih/image/upload/', {
			method: 'post',
			body: data,
		})
			.then(res => res.json())
			.then(data => {
				console.log('url devuelta = ', data);
				setCloudVidUrl(data.url);
				return data.url;
			})
			.catch(err => console.log('error', err));
	};

	if (!isLoadingexerciseAtributes) {
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

					<Card>
						{/*  //////////////// Campo nombre ejercicio //////////////// */}
						<FormControl
							required
							fullWidth>
							<TextField
								sx={{ m: 1 }}
								id='standard-basic'
								label='Nombre Ejercicio'
								variant='outlined'
								required
								errro={errorsUS.ExcersiceName}
								value={exerciseNameUS}
								onChange={handleChangeExerciseNameInput}
							/>
							{errorsUS.excersiceName ? (
								<span style={{ color: 'red' }}>
									El nombre del ejercicio es obligatorio
								</span>
							) : (
								<></>
							)}
						</FormControl>

						{/*  //////////////// Selectot Tipo Ejercicio //////////////// */}

						<FormControl
							required
							fullWidth>
							<InputLabel
								sx={{ m: 1 }}
								id='tipoEjercicioSelectLabel'>
								Tipo de Ejercicio
							</InputLabel>
							<Select
								sx={{ m: 1 }}
								labelId='tipoEjercicioSelectLabel'
								id='tipoEjercicioSelect'
								value={exerciseTypeUS}
								label='Tipo de Ejercicio'
								onChange={handleChangeExerciseType}>
								{exerciseAtributsUS.exerciseType.map((te, id) => (
									<MenuItem
										value={te._id}
										key={id}>
										{te.exerciseType}
									</MenuItem>
								))}
							</Select>
							{errorsUS.excersiceType ? (
								<span style={{ color: 'red' }}>
									El tipo de ejercicio es obligatorio
								</span>
							) : (
								<></>
							)}
						</FormControl>

						{/*  //////////////// Selector Dificultad Ejercicio //////////////// */}
						<FormControl
							required
							fullWidth>
							<InputLabel
								sx={{ m: 1 }}
								id='dificultadEjercicioSelectLabel'>
								Dificultad de Ejercicio
							</InputLabel>
							<Select
								sx={{ m: 1 }}
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
							{errorsUS.excersiceDificult ? (
								<span style={{ color: 'red' }}>
									La dificultad del ejercicio es obligatorio
								</span>
							) : (
								<></>
							)}
						</FormControl>

						{/*  //////////////// Selector partes cuerpo //////////////// */}
						<FormControl
							required
							fullWidth>
							<InputLabel
								sx={{ m: 1 }}
								id='demo-multiple-chip-label'>
								{' '}
								Parte del Cuerpo Involucradas{' '}
							</InputLabel>
							<Select
								sx={{ m: 1 }}
								labelId='demo-multiple-chip-label'
								id='demo-multiple-chip'
								multiple
								value={exerciseBodyPartsUS}
								onChange={handleChangeBodyPartSelector}
								input={
									<OutlinedInput
										id='select-multiple-chip'
										label='Parte del Cuerpo Involucradas'
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
							{errorsUS.excersiceBodyParts ? (
								<span style={{ color: 'red' }}>
									Las partes del cuerpo ejercicio son obligatorias
								</span>
							) : (
								<></>
							)}
						</FormControl>

						{/*  //////////////// Selector musculos Ejercicio //////////////// */}
						<FormControl
							required
							fullWidth>
							<InputLabel
								sx={{ m: 1 }}
								id='imputLabelMusculosEjercicio'>
								Musculos Involucrados
							</InputLabel>
							<Select
								sx={{ m: 1 }}
								labelId='imputLabelMusculosEjercicio'
								id='selectorMusculosEjercicio'
								multiple
								value={exerciseMuclesUS}
								onChange={handleChangeMuscleSelector}
								input={
									<OutlinedInput
										id='OutlinedInputMusculos'
										label='Musculos Involucrados'
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
							{errorsUS.excersiceMuscles ? (
								<span style={{ color: 'red' }}>
									Los musculos son obligatorios
								</span>
							) : (
								<></>
							)}
						</FormControl>

						{/*  //////////////// Selector Equipamiento //////////////// */}
						<FormControl
							required
							fullWidth>
							<InputLabel
								sx={{ m: 1 }}
								id='demo-multiple-chip-label2'>
								Equipamiento
							</InputLabel>
							<Select
								sx={{ m: 1 }}
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
							{errorsUS.excersiceEquipment ? (
								<span style={{ color: 'red' }}>
									El equipamiento del ejercicio es obligatorio
								</span>
							) : (
								<></>
							)}
						</FormControl>

						{/*  //////////////// explicación //////////////// */}
						<FormControl
							required
							fullWidth>
							<Typography sx={{ m: 1 }}>
								Detalle la explicación para realizar el ejercicio:
							</Typography>

							<TextField
								sx={{ m: 1 }}
								id='explicaciónEjercicio'
								label='Explicación Ejercicio'
								multiline
								rows={5}
								value={exerciseExplanationUS}
								onChange={handleChangeExplanationInput}
							/>
						</FormControl>

						{/*  //////////////// precauciones //////////////// */}
						<FormControl fullWidth>
							<Typography sx={{ m: 1 }}>
								Especifique las precauciones a tener en cuenta al momento de
								realizar el ejercicio:
							</Typography>

							<TextField
								sx={{ m: 1 }}
								id='explicaciónEjercicio'
								label='Precauciones Ejercicio'
								multiline
								rows={5}
								value={exercisePrecautionsUS}
								onChange={handleChangePrecautionsInput}
							/>
						</FormControl>
						<br />
						<br />

						<Box sx={{ flexGrow: 1, ml: 3 }}>
							<Grid
								container
								spacing={1}>
								<Grid>
									<Item>
										<img
											style={{ width: 100, height: 100 }}
											src={cloudImgUrl || defaultUrlImg}
											alt={imagenEjercicio?.original_filename}
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
												onChange={e => upLoadImage(e.target.files[0])}
											/>
										</Button>
									</Item>
								</Grid>
								<Grid>
									<Grid>
										<Item>
											<img
												style={{ width: 100, height: 100 }}
												src={cloudVidUrl || defaultUrlVid}
												alt={videoEjercicio?.original_filename}
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
													onChange={e => upLoadVideo(e.target.files[0])}
												/>
											</Button>
										</Item>
									</Grid>
								</Grid>
							</Grid>
						</Box>
						<Button
							sx={{ m: 2 }}
							variant='contained'
							onClick={() => {
								handleClickSaveButton();
							}}>
							Guardar Ejercicio
						</Button>
					</Card>
				</Container>
			</>
		);
	} else {
		return <h1>CARGANDO</h1>;
	}
}
