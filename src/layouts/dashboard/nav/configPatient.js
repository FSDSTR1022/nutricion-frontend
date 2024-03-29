/* eslint-disable no-unused-vars */
/* eslint-disable import/no-mutable-exports */
// component
import SvgColor from '../../../components/svg-color';
import calendar from './icon/calendar.svg';

// ----------------------------------------------------------------------

const icon = () => (
	<SvgColor
		src={calendar}
		sx={{ width: 1, height: 1 }}
	/>
);

const navConfig = [
	{
		title: 'Rutinas',
		path: '/dashboard/rutinecalendar',
		icon: icon(),
	},
];

export default navConfig;
