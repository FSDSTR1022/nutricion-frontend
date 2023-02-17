/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ListExcersice from "./listExcercise";
import { useEffect, useState } from 'react';
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
	TableBody,
	TableRow,
	TableCell,
	Box,
	TextField,
	InputAdornment,
	DialogContent,
	DialogActions,
	Dialog
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';

const NewRoutine = (props) => {
	const [warmUPCheckedUS, setWarmUPCheckedUS] = useState(true);
	const [streachingUS, seStreachingUS] = useState(true);
	const [accordionExpanded, setAccordionExpanded] = useState(false);
	const [rutineUS, setRutineUS] = useState({
		patient: '',
		day: '',
		rounds: [
			{
				order: 1, 
				roundName: 'warm-up',
				excercises: []
			},
			{
				order: 2,
				roundName: 'relax',
				excercises: []
			}
		]
	});
	const [roundsCuantity, setRoundsCuantity] = useState('');
	const [roundToEdit, setRoudToEdit] = useState('');
	const [roundNameToEdit, setRoundNameToEdit] = useState();
	const [openSelectExcerciseDialog, setOpenSelectExcerciseDialog] = useState(false);
	const [errorTextFild, setErrorTextFild] = useState(false);

	const [excerciseToAddUS, setExcerciseToAddUS] = useState([])
	const [roundDondeSeAgregara,setRoundDondeSeAgregara] = useState("")
	
	const rutina = {
		name: "Nombre de rutina", 
		patient: 'id',
		day: '24/01/2023',
		rounds: [
			{
				order: 1, 
				roundName: 'warm-up',
				excercises: [
					{
						exercise: "_id",
						timeOReps: '60'
					}
				]
			},
			{
				order: 2,
				roundName: '1',
				excercises: [
					{
						exercise: "_id",
						timeOReps: '60'
					},
					{
						exercise: "_id",
						timeOReps: '60'
					},
					{
						exercise: "_id",
						timeOReps: '60'
					}
				]
			},
			{
				order: 3,
				roundName: '2',
				excercises: [
					{
						exercise: "_id",
						timeOReps: '60'
					},
					{
						exercise: "_id",
						timeOReps: '60'
					},
					{
						exercise: "_id",
						timeOReps: '60'
					}
				]
			},
			{
				order: 4,
				roundName: 'relax',
				excercises: [
					{
						exercise: "_id",
						timeOReps: '60'
					}
				]
			}
		]
	};

	useEffect(() => {

		let { action } = props;
    
		if (action === undefined) {
			action = { action: 'newRutine' };
		}
		
		setRutineUS(rutina); 

		switch (action.action) {
			case "newRutine":
			  break;        
			  
			default:
			  break;
		  } 


	}, []);

	const handleChangeWarmUpSwitch = event => {
		setWarmUPCheckedUS(event.target.checked);
		if (event.target.checked) {
			const rounds = rutineUS.rounds;
			rounds.unshift({ roundName: 'Warm up'});

			setRutineUS(rutineUS => ({
				...rutineUS,
				rounds,
			}));
		} else {
			const rounds = rutineUS.rounds;
			rounds.splice(0, 1);

			setRutineUS(rutineUS => ({
				...rutineUS,
				rounds,
			}));
		}
	};

	const handleChangeRelaxSwitch = event => {
		seStreachingUS(event.target.checked);

		if (event.target.checked) {
			const rounds = rutineUS.rounds;
			rounds.push({ roundName: 'relax' });

			setRutineUS(rutineUS => ({
				...rutineUS,
				rounds,
			}));
		} else {
			const rounds = rutineUS.rounds;
			rounds.splice(rutineUS.rounds.length - 1, 1);

			setRutineUS(rutineUS => ({
				...rutineUS,
				rounds,
			}));
		}
	};

	const handleChangeAcordion = panel => (event, isExpanded) => {
		if (panel === 'addRound') {
			const rounds = rutineUS.rounds;
			rounds.splice(rutineUS.rounds.length - 1, 0, { roundName: 'Nuevo' });

			setRutineUS(rutineUS => ({
				...rutineUS,
				rounds,
			}));
		}

		setAccordionExpanded(isExpanded ? panel : false);
	};

	const handleChangeRoundsCantitySelect = event => {
		setRoundsCuantity(event.target.checked);
	};

	const handleClickAddExceciseIcon = round => event => {
		console.log('Click ADD Excercise ICON');
		/* console.log('round: ',round); */

		setRoundDondeSeAgregara(round)
		setOpenSelectExcerciseDialog(true) 
	};

	const handleClickEditExceciseIcon = event => {
		console.log('Click EDIT Excercise ICON');
	};

	const handleClickDeleteExceciseIcon = event => {
		console.log('Click DELETE Excercise ICON');
	};

	const handleClickShowRoundsButton = evento => {
		console.log(rutineUS.rounds);
	};

	const handleClickDeleteRoundIcon = roundName => event => {

        if (roundName === 'warm-up' || roundName === 'relax') {
					console.log('Es el round warm-up');
				} else {
                    
                    const rounds = rutineUS.rounds;

					const index = rounds.findIndex(element => {
						return element.roundName === roundName;
					});

					rounds.splice(index, 1);

					setRutineUS(rutineUS => ({
						...rutineUS,
						rounds,
					}));
				}
	};

	const handleOnChangeRoundNameTextField = roundName => event => {
		setRoundNameToEdit(event.target.value);
	};

	const handleKeyDonwRoundNameTextFiled = roundName => event => {
		
		if (event.key === 'Enter') {
			console.log('ENTER');

			const roundsA = rutineUS.rounds;
			roundsA.map(round => {
				if (round.roundName === roundName) {
					round.roundName = roundNameToEdit;
				}
				return true;
			}); 

			setRoudToEdit('');
			setRoundNameToEdit('');
		} else if (event.key === 'Escape') {
			console.log('Escape');

			setRoudToEdit('');
			setRoundNameToEdit('');
		}
	};

	const handleOnClickChangeRoundNameIcon = roundName => event => {
		setRoudToEdit(roundName);
		setRoundNameToEdit(roundName);
	};

	const handleOnClickAcceptRoundNameChange = roundName => {
		const roundsA = rutineUS.rounds;
		roundsA.map(round => {
			if (round.roundName === roundName) {
				round.roundName = roundNameToEdit;
			}
			return true;
		});

		setRoudToEdit('');
		setRoundNameToEdit('');
	};

	const handleClickAddExcerciseButton = ()=>{
		// Agregar los ejercicios de excerciseToAddUS en rutineUS segun roundDondeSeAgregara

		const rutina = rutineUS;
		const round = rutina.rounds.find(round => {
			return round.roundName === roundDondeSeAgregara
		});

		round.excercises = round.excercises.concat(excerciseToAddUS)

		setRutineUS(rutineUS => ({
			...rutineUS,
			round,
		}));

		setExcerciseToAddUS([]) 
		setRoundDondeSeAgregara('');
		setOpenSelectExcerciseDialog(false);

	}

	const getAccordions = round => {
		const acordionRound = (
			<Accordion
				key={round.roundName}
				expanded={accordionExpanded === round.roundName}
				onChange={handleChangeAcordion(round.roundName)}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1bh-content'
					id='panel1bh-header'
				>
					{roundToEdit !== round.roundName ? (
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
									onChange={handleOnChangeRoundNameTextField(round.roundName)}
									onKeyDown={handleKeyDonwRoundNameTextFiled(round.roundName)}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<CheckIcon
													color='success'
													onClick={() => {
														handleOnClickAcceptRoundNameChange(round.roundName);
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
					<div style={{ display: 'flex', justifyContent: 'end' }}>
						<DeleteIcon
							onClick={handleClickDeleteRoundIcon(round.roundName)}
						/>
						<EditIcon
                            onClick={handleOnClickChangeRoundNameIcon(round.roundName)}
						/>
					</div>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableBody>
							{round.excercises !== undefined
								? round.excercises.map(excercise => {
										return (
											<TableRow
												key={excercise.exerciseName}
												hover={true}
												sx={{
													'&:last-child td, &:last-child th': { border: 0 },
												}}
											>
												<TableCell component='th' scope='row' align='center'>
													Nombre Ejercicio: {excercise.exerciseName}
												</TableCell>
												<TableCell component='th' scope='row' align='center'>
													Tiempo / repeticiones: {excercise.timeOReps}
												</TableCell>
												<TableCell component='th' scope='row' align='center'>
													Elementos {excercise.equipment}
												</TableCell>
												<TableCell component='th' scope='row' align='center'>
													<DeleteIcon
														fontSize='small'
														onClick={() => {
															handleClickDeleteExceciseIcon();
														}}
													/>
													<EditIcon
														fontSize='small'
														onClick={() => {
															handleClickEditExceciseIcon();
														}}
													/>
												</TableCell>
											</TableRow>
										);
								  })
								: null}
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
										onClick={
											handleClickAddExceciseIcon(round.roundName)
										}
										/* onClick={() => {
											handleClickAddExceciseIcon(round.roundName);
										}} */
									/>
								</TableCell>
								<TableCell />
								<TableCell />
							</TableRow>
						</TableBody>
					</Table>
				</AccordionDetails>
			</Accordion>
		);

		if (streachingUS) {
			if (round.roundName !== 'relax') {
				return acordionRound;
			} else {
				return (
					<>
						{getAccordionAddRound()}
						{acordionRound}
					</>
				);
			}
		} else {
			/* preguntar si es el último */
			if (
				rutineUS.rounds.length - 1 !==
				rutineUS.rounds.findIndex(element => {
					return element.roundName === round.roundName;
				})
			) {
				return acordionRound;
			} else {
				return (
					<>
						{acordionRound}
						{getAccordionAddRound()}
					</>
				);
			}
		}
	};

	const getAccordionAddRound = () => {
		return (
			<>
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
			</>
		);
	};

	const handleCloseDialog = () => {
		setExcerciseToAddUS([]);
		setOpenSelectExcerciseDialog(false);
	  };

	const handleClickShowExcerciseButton = () => {
		console.log(excerciseToAddUS)
	  };

	return (
		<>
			<div>
				<h1>Nueva Rutina</h1>
				<br></br>
				<h2>24/01/2023</h2>
				<Button variant='contained' onClick={handleClickShowRoundsButton}>
					Mostrar Rounds
				</Button>
				<Button variant='contained' onClick={handleClickShowExcerciseButton}>
					Mostrar ejercicios a agregar
				</Button>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<FormControlLabel
					labelPlacement='start'
					value='start'
					label='Calentamiento'
					control={
						<Switch
							checked={warmUPCheckedUS}
							onChange={handleChangeWarmUpSwitch}
						/>
					}
				/>

				<FormControl sx={{ m: 1, minWidth: 200 }}>
					<InputLabel id='demo-simple-select-label'>
						Cantidad de Rounds
					</InputLabel>
					<Select
						labelId='demo-simple-select-autowidth-label'
						id='demo-simple-select-autowidth'
						value={roundsCuantity}
						onChange={handleChangeRoundsCantitySelect}
						autoWidth
						label='Cantidad de Rounds'
					>
						<MenuItem value={1}>{1}</MenuItem>
						<MenuItem value={2}>{2}</MenuItem>
						<MenuItem value={3}>{3}</MenuItem>
						<MenuItem value={4}>{4}</MenuItem>
						<MenuItem value={5}>{5}</MenuItem>
						<MenuItem value={6}>{6}</MenuItem>
						<MenuItem value={7}>{7}</MenuItem>
						<MenuItem value={8}>{8}</MenuItem>
						<MenuItem value={9}>{9}</MenuItem>
						<MenuItem value={10}>{10}</MenuItem>
					</Select>
				</FormControl>

				<FormControlLabel
					labelPlacement='start'
					value='start'
					control={
						<Switch checked={streachingUS} onChange={handleChangeRelaxSwitch} />
					}
					label='Streaching y Relax'
				/>
			</div>
			<div>
				{rutineUS.rounds.map(round => {
					return getAccordions(round);
				})}
			</div>
			<div>
				<Dialog
					open={openSelectExcerciseDialog}
					onClose={handleCloseDialog}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth="xl"
					maxWidth="xl"
				>
					<DialogContent>
						<ListExcersice action={"selectExcercise"} excercisesToAdd={excerciseToAddUS} setExcerciseToAdd={setExcerciseToAddUS} setOpenDialog={setOpenSelectExcerciseDialog}></ListExcersice>
					</DialogContent>
					<DialogActions>
						<Button value="cancelar" onClick={handleCloseDialog}> Cancelar </Button>
						<Button value="agregar" onClick={handleClickAddExcerciseButton}> Agregar ejercicios </Button>
					</DialogActions>
				</Dialog> 
			</div>
		</>
	);
};

export default NewRoutine;
