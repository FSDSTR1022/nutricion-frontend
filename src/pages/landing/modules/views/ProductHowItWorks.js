import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Typography from '../components/Typography';
import appCurvyLines from '../image/appCurvyLines.png';

const item = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	px: 5,
};

const number = {
	fontSize: 24,
	fontFamily: 'default',
	color: 'secondary.main',
	fontWeight: 'medium',
};

function ProductHowItWorks() {
	return (
		<Box
			component='section'
			sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}>
			<Container
				sx={{
					mt: 10,
					mb: 15,
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Box
					component='img'
					src={appCurvyLines}
					alt='curvy lines'
					sx={{
						pointerEvents: 'none',
						position: 'absolute',
						top: -180,
						opacity: 0.7,
					}}
				/>
				<Typography
					variant='h4'
					marked='center'
					component='h2'
					sx={{ mb: 14 }}>
					Como funciona
				</Typography>
				<div>
					<Grid
						container
						spacing={5}>
						<Grid
							item
							xs={12}
							md={4}>
							<Box sx={item}>
								<Box sx={number}>1.</Box>
								<MailOutlineIcon sx={{ fontSize: 80 }} />
								<Typography
									variant='h5'
									align='center'>
									Reciba la invitación por parte de un profesional de la salud.
								</Typography>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}>
							<Box sx={item}>
								<Box sx={number}>2.</Box>
								<PlaylistAddCheckIcon sx={{ fontSize: 80 }} />
								<Typography
									variant='h5'
									align='center'>
									Realice las actividades indicadas por el profesional. Indique
									como se sitio con cada una de ellas.
								</Typography>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}>
							<Box sx={item}>
								<Box sx={number}>3.</Box>
								<SignalCellularAltIcon sx={{ fontSize: 80 }} />
								<Typography
									variant='h5'
									align='center'>
									Realice un seguimiento y control de su evolucion y estado de
									salud con el profesional de la salud.
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</div>
			</Container>
		</Box>
	);
}

export default ProductHowItWorks;
