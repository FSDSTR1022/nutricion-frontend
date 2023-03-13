import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import Button from '../components/Button';
import img11 from '../image/image-11.png';

function ProductCTAPatient() {
	return (
		<Container
			component='section'
			sx={{ mt: 10, display: 'flex' }}>
			<Grid container>
				<Grid
					item
					xs={12}
					md={6}
					sx={{ zIndex: 1 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							bgcolor: '#b2dfdb',
							py: 8,
							px: 3,
						}}>
						<Box sx={{ maxWidth: 400 }}>
							<Typography variant='h6'>Pacientes</Typography>
							<Typography
							/* variant='h5' */
							>
								- Reciba los planes deportivos de los profesionales.
								<br />
								- Vea el detalle de los ejercicios incluidos en cada rutina.
								<br />
								- Indique los ejercios y las rutinas realizadas y las
								sensasiones en cada una de ellas.
								<br />
								- Reciba del profesional la evolución de su estado físico y
								mejora del estado de salud.
								<br />
								<br />
							</Typography>
							<Button
								/* type='submit'
								color='primary' */
								variant='contained'
								sx={{ width: '100%' }}>
								ya soy paciente
							</Button>
						</Box>
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}>
					<Box
						sx={{
							position: 'absolute',
							top: -67,
							left: -67,
							right: 0,
							bottom: 0,
							width: '100%',
							background:
								'url(/static/themes/onepirate/productCTAImageDots.png)',
						}}
					/>
					<Box
						component='img'
						src={img11}
						alt='call to action'
						sx={{
							position: 'absolute',
							top: -28,
							left: -28,
							right: 0,
							bottom: 0,
							width: '100%',
							maxWidth: 600,
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
}

export default ProductCTAPatient;
