/* eslint-disable import/no-named-as-default */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ListExercise from './pages/exercise/ExerciseListPage';
import FormExercise from './pages/exercise/NewExercisePage';
import FormPatient from './pages/patient/formPatient';
import PatientPage from './pages/patient/PatientPage';
import RutinePage from './pages/rutine/RutinePage';
import PatientCalendarPage from './pages/patient/PatientCalendarPage';
import UserProfile from './pages/UserProfile';
import Index from './pages/landing/Home';

// ----------------------------------------------------------------------

export default function Router() {
	const routes = useRoutes([
		{
			path: '/dashboard',
			element: <DashboardLayout />,
			children: [
				{ element: <Navigate to='/dashboard/app' />, index: true },
				{ path: 'app', element: <DashboardAppPage /> },
				{ path: 'user', element: <UserPage /> },
				{ path: 'products', element: <ProductsPage /> },
				{ path: 'blog', element: <BlogPage /> },
				{ path: 'exercises', element: <ListExercise /> },
				{ path: 'newexercise', element: <FormExercise /> },
				{ path: 'pacients', element: <PatientPage /> },
				{ path: 'newpacient', element: <FormPatient /> },
				{ path: 'newroutine', element: <RutinePage /> },
				{ path: 'pacients/:id', element: <PatientCalendarPage /> },
				{ path: 'profile', element: <UserProfile /> },
			],
		},
		{
			path: 'login',
			element: <LoginPage />,
		},
		{
			path: 'landing',
			element: <Index />,
		},
		{
			path: 'register',
			element: <RegisterPage />,
		},
		{
			element: <SimpleLayout />,
			children: [
				{ element: <Navigate to='/dashboard/app' />, index: true },
				{ path: '404', element: <Page404 /> },
				{ path: '*', element: <Navigate to='/404' /> },
			],
		},
		{
			path: '*',
			element: (
				<Navigate
					to='/404'
					replace
				/>
			),
		},
	]);

	return routes;
}
