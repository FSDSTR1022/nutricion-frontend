import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import instagram from '../icon/instagram.png';
import twitter from '../icon/twitter.png';

function Copyright() {
	return (
		<>
			{'© '}
			<Link
				color='inherit'
				href='https://mui.com/'>
				NOMBRE DE LA APLICACION
			</Link>{' '}
			{new Date().getFullYear()}
		</>
	);
}

const iconStyle = {
	width: 40,
	height: 40,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	/* backgroundColor: 'warning.main', */
	mr: 1,
	/* '&:hover': {
		bgcolor: 'warning.dark',
	}, */
};

export default function AppFooter() {
	return (
		<Typography
			component='footer'
			sx={{ display: 'flex', bgcolor: 'secondary.light' }}>
			<Container sx={{ my: 8, display: 'flex' }}>
				<Grid
					container
					spacing={5}>
					<Grid
						item
						xs={6}
						sm={4}
						md={3}>
						<Grid
							container
							direction='column'
							justifyContent='flex-end'
							spacing={2}
							sx={{ height: 120 }}>
							<Grid
								item
								sx={{ display: 'flex' }}>
								<Box sx={iconStyle}>
									<img
										src={instagram}
										alt='Instagram'
									/>
								</Box>
								<Box sx={iconStyle}>
									<img
										src={twitter}
										alt='Twitter'
									/>
								</Box>
							</Grid>
							<Grid item>
								<Copyright />
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={6}
						sm={4}
						md={2}>
						<Typography
							variant='h6'
							marked='left'
							gutterBottom>
							Legal
						</Typography>
						<Box
							component='ul'
							sx={{ m: 0, listStyle: 'none', p: 0 }}>
							<Box
								component='li'
								sx={{ py: 0.5 }}>
								<Link href='/landing'>Terms</Link>
							</Box>
							<Box
								component='li'
								sx={{ py: 0.5 }}>
								<Link href='/landing'>Privacy</Link>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Typography>
	);
}
