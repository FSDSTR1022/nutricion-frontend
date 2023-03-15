/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import moment from 'moment';
// components
import Iconify from '../components/iconify';
// sections
import {
	AppTasks,
	AppNewsUpdate,
	AppOrderTimeline,
	AppCurrentVisits,
	AppWebsiteVisits,
	AppTrafficBySite,
	AppWidgetSummary,
	AppCurrentSubject,
	AppConversionRates,
} from '../sections/@dashboard/app';
import { getAllUsers } from '../services/userService';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
	const theme = useTheme();

	const [patientsListUS, setPatientListUS] = useState([]);
	const [isLoadingPatientsUS, setIsLoadingPatientsUS] = useState(true);
	const [rutinasList, setRutinasList] = useState([]);
	const [userRutinesList, setUserRutinesList] = useState([]);
	const [chartLabels, setChartLabels] = useState([]);
	const [fullRutineExpected, setFullRutineExpected] = useState([]);
	const [fullRutineCompleted, setFullRutineCompleted] = useState([]);
	const [nRounds, setNRounds] = useState();
	const [nExer, seTNExer] = useState();
	const [numberOfRoutines, setNumberOfRoutines] = useState();
	const [percentage, setPercentage] = useState('');
	const [colorWidget, setColorWidget] = useState('success');

	useEffect(() => {
		const user = localStorage.getItem('user');
		const userJSON = JSON.parse(user);
		console.log('usuario id', userJSON.id);

		const getAllusers = async () => {
			const response = await getAllUsers();
			if (response.status === 200) {
				setPatientListUS(response.data);
				setIsLoadingPatientsUS(false);
			}
		};
		const getRoutines = async () => {
			const response = await getROutines();
			if (response.status === 200) {
				setRutinasList(response.data);
				const rutProf = response.data.filter(
					rut => rut.professional === userJSON.id
				); // no se está guardando el "profetional" en la rutina. falta el id localstorage?
				setUserRutinesList(rutProf);
				setNumberOfRoutines(rutProf.length);
				datosGraph(rutProf);
			}
		};
		getAllusers();
		getRoutines();
	}, []);

	const getROutines = async () => {
		const result = await fetch(`${process.env.REACT_APP_BACK_URL}/rutines`);
		const parseResult = await result.json();
		const data = { data: parseResult, status: result.status };
		return data;
	};

	const datosGraph = profRutines => {
		const fechasRutinas = profRutines?.map(rut => moment(rut.day).format('L'));
		const axis = [...new Set(fechasRutinas)];
		setChartLabels(axis);
		const numberOfRoutinesPerDay = [];
		const numberOfRoutinesCompletedPerDay = [];
		let exercisesTotalArray = [];
		let numberOfExercises = 0;
		let rounds = [];
		let nCompl = 0;

		axis.forEach(date => {
			const routinesPerDate = profRutines?.filter(
				rut => moment(rut.day).format('L') === date
			);
			numberOfRoutinesPerDay.push(routinesPerDate.length);
			setFullRutineExpected(numberOfRoutinesPerDay);
			console.log(date, routinesPerDate, numberOfRoutinesPerDay);
			const routinesCompletedPerDay = routinesPerDate.filter(
				rut => rut.status === 'done'
			);
			numberOfRoutinesCompletedPerDay.push(routinesCompletedPerDay.length);
			nCompl += routinesCompletedPerDay.length;
			console.log('numbers completed', nCompl);
			setFullRutineCompleted(numberOfRoutinesCompletedPerDay);
		});

		profRutines?.forEach(routine => {
			const roundsPerRoutine = [...routine?.rounds];
			console.log('rounds per routine', roundsPerRoutine);
			rounds = [...rounds, ...roundsPerRoutine];
			console.log('Rounds sum', rounds);
		});

		rounds?.forEach(round => {
			const exerPerRound = [...round?.exercises];
			console.log('exer per round', exerPerRound);
			exercisesTotalArray = [...exercisesTotalArray, ...exerPerRound];
			numberOfExercises = exercisesTotalArray.length;
			console.log('exer per routines', exercisesTotalArray, numberOfExercises);
		});

		setNRounds(rounds.length);
		seTNExer(numberOfExercises);
		console.log('rutinas totals', profRutines.length);
		setPercentage(95);
		// setPercentage(Math.round((nCompl / profRutines.length) * 100));
		console.log('percen', percentage);
		const colorOp = [0.5, 0.7, 0.9];

		if (percentage >= colorOp[2]) {
			setColorWidget('#C3F7BB');
		} else if (percentage >= colorOp[1] && percentage < colorOp[2]) {
			setColorWidget('info');
		} else if (percentage >= colorOp[0] && percentage < colorOp[1]) {
			setColorWidget('warning');
		} else {
			setColorWidget('error');
		}

		/* roundsPerRoutine.forEach(round => {
				const exerPerRound = [...round?.execises];
				console.log('exercises per routine', exerPerRound);
			});
			console.log('rounds per rutine', roundsPerRoutine); */
	};

	const user = localStorage.getItem('user');
	const userJSON = JSON.parse(user);

	return (
		<>
			<Helmet>
				<title> Dashboard | Minimal UI </title>
			</Helmet>

			<Container maxWidth='xl'>
				<Typography
					variant='h4'
					sx={{ mb: 5 }}>
					Hola, Bienvenido!
				</Typography>

				<Grid
					container
					spacing={3}>
					<Grid
						item
						xs={12}
						sm={6}
						md={3}>
						<AppWidgetSummary
							title='Total Patients'
							total={patientsListUS.length}
							icon={'fa6-solid:people-group'}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
						md={3}>
						<AppWidgetSummary
							title='Total Routines'
							total={userRutinesList.length}
							color='info'
							icon={'fluent-mdl2:processing-run'}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
						md={3}>
						<AppWidgetSummary
							title='Total Rounds'
							total={nExer}
							color='warning'
							icon={'healthicons:exercise-weights'}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
						md={3}>
						<AppWidgetSummary
							title='Ratio Routines Completed'
							total={`${percentage}%`}
							color={colorWidget}
							icon={'eos-icons:performance'}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={8}>
						<AppWebsiteVisits
							title={`Performance Professional:  ${userJSON.name.toUpperCase()}`}
							subheader='Routines Completed Index'
							chartLabels={chartLabels}
							chartData={[
								{
									name: 'Routinas Completed',
									type: 'column',
									fill: 'solid',
									data: fullRutineCompleted,
								},
								{
									name: 'Total Routinas',
									type: 'column',
									fill: 'solid',
									data: fullRutineExpected,
								},
							]}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={4}>
						<AppCurrentVisits
							title='Current Visits'
							chartData={[
								{ label: 'America', value: 4344 },
								{ label: 'Asia', value: 5435 },
								{ label: 'Europe', value: 1443 },
								{ label: 'Africa', value: 4443 },
							]}
							chartColors={[
								theme.palette.primary.main,
								theme.palette.info.main,
								theme.palette.warning.main,
								theme.palette.error.main,
							]}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={8}>
						<AppConversionRates
							title='Conversion Rates'
							subheader='(+43%) than last year'
							chartData={[
								{ label: 'Italy', value: 400 },
								{ label: 'Japan', value: 430 },
								{ label: 'China', value: 448 },
								{ label: 'Canada', value: 470 },
								{ label: 'France', value: 540 },
								{ label: 'Germany', value: 580 },
								{ label: 'South Korea', value: 690 },
								{ label: 'Netherlands', value: 1100 },
								{ label: 'United States', value: 1200 },
								{ label: 'United Kingdom', value: 1380 },
							]}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={4}>
						<AppCurrentSubject
							title='Current Subject'
							chartLabels={[
								'English',
								'History',
								'Physics',
								'Geography',
								'Chinese',
								'Math',
							]}
							chartData={[
								{ name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
								{ name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
								{ name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
							]}
							chartColors={[...Array(6)].map(
								() => theme.palette.text.secondary
							)}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={8}>
						<AppNewsUpdate
							title='News Update'
							list={[...Array(5)].map((_, index) => ({
								id: faker.datatype.uuid(),
								title: faker.name.jobTitle(),
								description: faker.name.jobTitle(),
								image: `/assets/images/covers/cover_${index + 1}.jpg`,
								postedAt: faker.date.recent(),
							}))}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={4}>
						<AppOrderTimeline
							title='Order Timeline'
							list={[...Array(5)].map((_, index) => ({
								id: faker.datatype.uuid(),
								title: [
									'1983, orders, $4220',
									'12 Invoices have been paid',
									'Order #37745 from September',
									'New order placed #XF-2356',
									'New order placed #XF-2346',
								][index],
								type: `order${index + 1}`,
								time: faker.date.past(),
							}))}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={4}>
						<AppTrafficBySite
							title='Traffic by Site'
							list={[
								{
									name: 'FaceBook',
									value: 323234,
									icon: (
										<Iconify
											icon={'eva:facebook-fill'}
											color='#1877F2'
											width={32}
										/>
									),
								},
								{
									name: 'Google',
									value: 341212,
									icon: (
										<Iconify
											icon={'eva:google-fill'}
											color='#DF3E30'
											width={32}
										/>
									),
								},
								{
									name: 'Linkedin',
									value: 411213,
									icon: (
										<Iconify
											icon={'eva:linkedin-fill'}
											color='#006097'
											width={32}
										/>
									),
								},
								{
									name: 'Twitter',
									value: 443232,
									icon: (
										<Iconify
											icon={'eva:twitter-fill'}
											color='#1C9CEA'
											width={32}
										/>
									),
								},
							]}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={8}>
						<AppTasks
							title='Tasks'
							list={[
								{ id: '1', label: 'Create FireStone Logo' },
								{ id: '2', label: 'Add SCSS and JS files if required' },
								{ id: '3', label: 'Stakeholder Meeting' },
								{ id: '4', label: 'Scoping & Estimations' },
								{ id: '5', label: 'Sprint Showcase' },
							]}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
