import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '../components/Typography';
import imag12 from '../image/image-12.png';

export default function ProductHero() {
	return (
		<>
			<Container
				sx={{
					mt: 4,
					mb: 20,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography
					color='inherit'
					align='center'
					variant='h2'
					marked='center'
					sx={{ mb: 1, mt: { xs: 4, sm: 10 } }}>
					Mejora tu salud de manera facil
				</Typography>
				<Typography
					color='inherit'
					align='center'
					variant='h6'
					sx={{ mb: 1, mt: { xs: 4, sm: 10 } }}>
					Una manera ágil de mejorar tu salud y calidad de vida con la
					supervición de un profesional
				</Typography>
				<Box
					sx={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						backgroundColor: 'common.black',
						opacity: 0.5,
						zIndex: -1,
					}}
				 >
					<img
					src={imag12}
					alt="imagen"
				/>
				 </Box>
				
			</Container>
		</>
	);
}