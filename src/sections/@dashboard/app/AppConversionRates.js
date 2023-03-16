import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader } from '@mui/material';
import { fontWeight } from '@mui/system';

// @mui
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
	title: PropTypes.string,
	subheader: PropTypes.string,
	chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({
	title,
	subheader,
	feedBack,

	...other
}) {
	const chartLabels = [
		Object.getOwnPropertyNames(feedBack)[1],
		Object.getOwnPropertyNames(feedBack)[3],
		Object.getOwnPropertyNames(feedBack)[0],
		Object.getOwnPropertyNames(feedBack)[2],
	];

	const chartSeries = [
		feedBack['Casi me muero'],
		feedBack['Algo pude hacer'],
		feedBack['Estuvo bien'],
		feedBack['Necesito más'],
	];

	const chartOptions = useChart({
		tooltip: {
			marker: { show: false },
			y: {
				formatter: seriesName => fNumber(seriesName),
				title: {
					formatter: () => '',
				},
			},
		},
		plotOptions: {
			bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
			legend: {
				fontSize: '100px',
				fontWeight: 700,
			},
		},
		xaxis: {
			categories: chartLabels,
		},
	});

	return (
		<Card {...other}>
			<CardHeader
				title={title}
				subheader={subheader}
			/>

			<Box
				sx={{ mx: 3 }}
				dir='ltr'>
				<ReactApexChart
					type='bar'
					series={[{ data: chartSeries }]}
					options={chartOptions}
					height={364}
				/>
			</Box>
		</Card>
	);
}
