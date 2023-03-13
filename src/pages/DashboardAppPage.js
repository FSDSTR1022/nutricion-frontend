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

	useEffect(() => {
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
					rut => rut.user.profetional === '640dadcf849d5a2688be06c2'
				); // no se está guardando el "profetional" en la rutina. falta el id localstorage?
				setUserRutinesList(rutProf);
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

	/* const getRoutines = () => {
		fetch('https://backendrailways-production.up.railway.app/rutines/')
			.then(res => res.json())
			.then(data => {
				setRutinasList(data);
				console.log('rutinas lista', rutinasList);
			})
			.catch(err => console.log('error', err));
	}; */

	const datosGraph = profRutines => {
		console.log('dentro datosGraph');

		const fechasRutinas = profRutines?.map(rut => moment(rut.day).format('L'));
		const axis = [...new Set(fechasRutinas)];
		setChartLabels(axis);
		const mm = [];
		axis.forEach(date => {
			const m = profRutines?.filter(
				rut => moment(rut.day).format('L') === date
			).length;
			mm.push(m);
			setFullRutineExpected(mm);
			console.log(date, m, mm);
			setFullRutineCompleted([1, 2, 0, 1, 1]);
		});
	};

	return (
		<>
			<Helmet>
				<title> Dashboard | Minimal UI </title>
			</Helmet>

			<Container maxWidth='xl'>
				<Typography
					variant='h4'
					sx={{ mb: 5 }}>
					Hola, Bienvenido de nuevo
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
							title='Total Exercises'
							total={1723315}
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
							title='Bug Reports'
							total={234}
							color='error'
							icon={'ant-design:bug-filled'}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={8}>
						<AppWebsiteVisits
							title='Performance'
							subheader='Routines filled Index'
							chartLabels={chartLabels}
							chartData={[
								{
									name: 'Routinas Filled',
									type: 'column',
									fill: 'solid',
									data: fullRutineCompleted,
								},
								{
									name: 'Routinas Expected Filled',
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
