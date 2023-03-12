/* eslint-disable import/no-mutable-exports */
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = name => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 1, height: 1 }}
	/>
);

const userLocalStorag = localStorage.getItem('user');
		const user = JSON.parse(userLocalStorag)

let navConfig = []
if(user!== null)
{		
	if(user.type === "profesional")
	{
		navConfig= [].concat([
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
		])
	}
	else if(user.type === "patient")
	{
		navConfig= [].concat([{
			title: 'Rutinas',
			path: '/rutinecalendar',
			icon: icon('ic_analytics'),
		},])
	
	}	

}
	

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


