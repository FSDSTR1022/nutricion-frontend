/* eslint-disable import/no-mutable-exports */
// component
import SvgColor from '../../../components/svg-color';
import exercise from './icon/exercise.svg'
import patient from './icon/patients.svg'

// ----------------------------------------------------------------------

const icon = name => {
	
	let icon2=''

	switch (name) {
		case "exercise":
			icon2=exercise
			break;
		case "patients":
			icon2=patient
			break;
		case "ic_analytics":
			icon2=`/assets/icons/navbar/${name}.svg`
			console.log(icon2)
			break;		
		default:
			break;
	}
	
	return(<SvgColor		
		src={icon2}
		sx={{ width: 1, height: 1 }}
	/>)
};

const navConfig = [
			 {
				title: 'dashboard',
				path: '/dashboard/app',
				icon: icon('ic_analytics'),
			},
			/* {
				title: 'user',
				path: '/dashboard/user',
				icon: icon('ic_user'),
			},
			{
				title: 'product',
				path: '/dashboard/products',
				icon: icon('ic_cart'),
			},
			{
				title: 'blog',
				path: '/dashboard/blog',
				icon: icon('ic_blog'),
			},
			{
				title: 'login',
				path: '/login',
				icon: icon('ic_lock'),
			},
			{
				title: 'Not found',
				path: '/404',
				icon: icon('ic_disabled'),
			}, */
			{
				title: 'Ejercicios',
				path: '/dashboard/exercises',
				icon: icon('exercise'),
			},
			/* {
				title: 'Nuevo Ejercicio',
				path: '/dashboard/newexercise',
				icon: icon('ic_user'),
			}, */
			/* {
				title: 'Nuevo Paciente',
				path: '/dashboard/newpacient',
				icon: icon('ic_user'),
			}, */
			{
				title: 'Pacientes',
				path: '/dashboard/pacients',
				icon: icon('patients'),
			},
			/* {
				title: 'Landing',
				path: '/landing',
				icon: icon('ic_analytics'),
			}, */
			/* {
				title: 'Profile',
				path: '/dashboard/profile',
				icon: icon('ic_analytics'),
			}, */
		];
	

export default navConfig;

/* 
const navConfig = [
	{
		title: 'dashboard',
		path: '/dashboard/app',
		icon: icon('ic_analytics'),
	},
	{
		title: 'user',
		path: '/dashboard/user',
		icon: icon('ic_user'),
	},
	{
		title: 'product',
		path: '/dashboard/products',
		icon: icon('ic_cart'),
	},
	{
		title: 'blog',
		path: '/dashboard/blog',
		icon: icon('ic_blog'),
	},
	{
		title: 'login',
		path: '/login',
		icon: icon('ic_lock'),
	},
	{
		title: 'Not found',
		path: '/404',
		icon: icon('ic_disabled'),
	},
	{
		title: 'Ejercicios',
		path: '/dashboard/exercises',
		icon: icon('ic_user'),
	},
	{
		title: 'Nuevo Ejercicio',
		path: '/dashboard/newexercise',
		icon: icon('ic_user'),
	},
	{
		title: 'Nuevo Paciente',
		path: '/dashboard/newpacient',
		icon: icon('ic_user'),
	},
	{
		title: 'Pacientes',
		path: '/dashboard/pacients',
		icon: icon('ic_user'),
	},
	{
		title: 'Nueva Rutina',
		path: '/dashboard/newroutine',
		icon: icon('ic_analytics'),
	},
	{
		title: 'Landing',
		path: '/landing',
		icon: icon('ic_analytics'),
	},
	{
		title: 'Profile',
		path: '/dashboard/profile',
		icon: icon('ic_analytics'),
	},
]; */


