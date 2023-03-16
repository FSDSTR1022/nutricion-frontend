/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
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
	const [iconoWidget, setIconoWidget] = useState('ic:baseline-emoji-emotions');
	const [satisfaction, setSatisfaction] = useState([]);
	const [feedBack, setFeedBack] = useState([]);

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
				);
				setUserRutinesList(rutProf);
				setNumberOfRoutines(rutProf.length);
				datosGraph(rutProf);
				satisfactionGraph(rutProf);
				feedBackGraph(rutProf);
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

			const routinesCompletedPerDay = routinesPerDate.filter(
				rut => rut.status === 'done'
			);
			numberOfRoutinesCompletedPerDay.push(routinesCompletedPerDay.length);
			nCompl += routinesCompletedPerDay.length;

			setFullRutineCompleted(numberOfRoutinesCompletedPerDay);
		});

		profRutines?.forEach(routine => {
			const roundsPerRoutine = [...routine?.rounds];

			rounds = [...rounds, ...roundsPerRoutine];
		});

		rounds?.forEach(round => {
			const exerPerRound = [...round?.exercises];

			exercisesTotalArray = [...exercisesTotalArray, ...exerPerRound];
			numberOfExercises = exercisesTotalArray.length;
		});

		setNRounds(rounds.length);
		seTNExer(numberOfExercises);

		const percen = Math.round((nCompl / profRutines.length) * 100);
		setPercentage(percen);
		// setPercentage(------)   /* METER AQUÍ EL VALOR PARA VER EL CAMBIO DE COLOR DEL WIDGET
		const colorOp = [50, 70, 90];

		if (percen >= colorOp[2]) {
			setColorWidget('success');
			setIconoWidget('mdi:face-kiss-outline');
		} else if (percen >= colorOp[1] && percentage < colorOp[2]) {
			setColorWidget('info');
			setIconoWidget('mdi:emoji-happy');
		} else if (percen >= colorOp[0] && percentage < colorOp[1]) {
			setColorWidget('warning');
			setIconoWidget('mdi:emoji-confused-outline');
		} else {
			setColorWidget('error');
			setIconoWidget('mdi:emoji-cry-outline');
		}
	};

	const feedBackGraph = profRutines => {
		const allFeedBack = profRutines
			?.map(e => (!e.feedback ? null : e.feedback))
			.filter(e => e !== null);
		const arrayFeedBack = allFeedBack.reduce((elemento, index) => {
			const contador = elemento[index] ?? 0;
			return { ...elemento, [index]: contador + 1 };
		}, {});
		setFeedBack(arrayFeedBack);

		console.log('feedback', arrayFeedBack);
	};
	const satisfactionGraph = profRutines => {
		const arrayRoutineSatisfaction = [];
		profRutines?.forEach(routine => {
			routine?.satisfaction
				? arrayRoutineSatisfaction.push(routine?.satisfaction)
				: null;
		});

		// console.log('arrayRoutineSatis', arrayRoutineSatisfaction);
		const arraySatisfaction = arrayRoutineSatisfaction.reduce(
			(elemento, index) => {
				const contador = elemento[index] ?? 0;

				return { ...elemento, [index]: contador + 1 };
			},
			{}
		);
		// console.log('arraysatisfaction', arraySatisfaction);
		const arr = [];
		for (let i = 1; i <= 5; i++) {
			!arraySatisfaction[i] ? arr.push(0) : arr.push(arraySatisfaction[i]);
			// console.log('arr in loop', arr);
		}

		// console.log('arr final', arr);
		setSatisfaction(arr);
		// console.log("arr total", arr)

		// setSatisfaction(arraySatisfaction);
		// <console.log('satisfaction', satisfaction);
		// const perfentageSatis = [arraySatisfaction[0]['1']]
	};

	const user = localStorage.getItem('user');
	const userJSON = JSON.parse(user);

	return (
		<>
			<Helmet>
				<title>{`Dashboard | ${userJSON.name.toUpperCase()}`} </title>
			</Helmet>

			<Container maxWidth='xl'>
				<Typography
					variant='h4'
					sx={{ mb: 5 }}>
					{`PERFORMANCE PROFESSIONAL ${userJSON.name.toUpperCase()}`}
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
							title='Total Exercices'
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
							icon={iconoWidget}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={8}>
						<AppWebsiteVisits
							title='Routines Completed Index'
							subheader='last 30 days'
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
							satisfaction={satisfaction}
							title='Satisfaction Index'
							chartData={[
								{ label: 'Bad' },
								{ label: 'Regular' },
								{ label: 'Normal' },
								{ label: 'Good' },
								{ label: 'Outstanding' },
							]}
							chartColors={[
								theme.palette.error.main,
								theme.palette.warning.main,
								theme.palette.primary.main,
								theme.palette.info.main,
								theme.palette.success.main,
							]}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={8}>
						<AppConversionRates
							title='FeedBack Accurate Load'
							subheader='Total Routines'
							feedBack={feedBack}
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
