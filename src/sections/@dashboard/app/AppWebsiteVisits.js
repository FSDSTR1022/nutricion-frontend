import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
	title: PropTypes.string,
	subheader: PropTypes.string,
	chartData: PropTypes.array.isRequired,
	chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({
	title,
	subheader,
	chartLabels,
	chartData,
	...other
}) {
	const chartOptions = useChart({
		plotOptions: { bar: { columnWidth: '16%' } },
		fill: { type: chartData.map(i => i.fill) },
		labels: chartLabels,
		xaxis: { type: 'string' },
		annotations: {
			yaxis: [
				{
					y: 15,
					y2: 20,
					borderColor: '#000',
					fillColor: '#FEB019',
					label: {
						text: 'Eficiency Range Week',
					},
				},
				{
					y: 55,
					y2: 65,
					borderColor: '#000',
					fillColor: '#97DEFF',
					label: {
						text: 'Eficiency Range Month',
					},
				},
			],
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: y => {
					if (typeof y !== 'undefined') {
						return `${y.toFixed(0)} routines`;
					}
					return y;
				},
			},
		},
	});

	return (
		<Card {...other}>
			<CardHeader
				title={title}
				subheader={subheader}
			/>

			<Box
				sx={{ p: 3, pb: 1 }}
				dir='ltr'>
				<ReactApexChart
					type='line'
					series={chartData}
					options={chartOptions}
					height={364}
				/>
			</Box>
		</Card>
	);
}
