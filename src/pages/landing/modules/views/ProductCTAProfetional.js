import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Typography from '../components/Typography';
import Button from '../components/Button';
import img10 from '../image/image-10.png';

function ProductCTAProfessional() {
	const navigate = useNavigate();
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
							bgcolor: '#bbdefb',
							py: 8,
							px: 3,
						}}>
						<Box sx={{ maxWidth: 400 }}>
							<Typography variant='h6'>Preparadores físicos</Typography>
							<Typography
							/* variant='h5' */
							>
								- Consulte el más completo listado de ejercicios según parte del
								cuerpo, intensidad, elementos entre otras muchas otras maneras
								de buscar.
								<br />
								- Elabore planes de entrenamiento personalizados para cada
								persona.
								<br />
								- Consulte las dietas y planes nutricionales de cada persona a
								fin de elaborar el plan de ejercicios.
								<br />
								- Realice la comunicación con cada paciente de manera rápida,
								ágil y segura.
								<br />
								<br />
							</Typography>
							<Button
								variant='contained'
								sx={{ width: '100%' }}
								onClick={() => {
									navigate('/register');
								}}>
								Registarse como Profesional
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
						src={img10}
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
			{/* <Snackbar
				open={open}
				closeFunc={handleClose}
				message='We will send you our best offers, once a week.'
			/> */}
		</Container>
	);
}

export default ProductCTAProfessional;
