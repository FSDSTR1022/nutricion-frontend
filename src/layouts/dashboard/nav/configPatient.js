/* eslint-disable import/no-mutable-exports */
// component
import SvgColor from '../../../components/svg-color';
import calendar from './calendar.svg'

// ----------------------------------------------------------------------

const icon = name => (
	<SvgColor
		src={calendar}
		sx={{ width: 1, height: 1 }}
	/>
);

const navConfig = [
	{
			title: 'Rutinas',
			path: '/dashboard/rutinecalendar',
			icon: icon('ic_analytics'),
		},
	];
	

export default navConfig;
