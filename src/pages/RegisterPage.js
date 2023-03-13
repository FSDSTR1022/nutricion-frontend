import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// hooks
import { useNavigate } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { RegisterForm } from '../sections/auth/register';
// navigate

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex',
	},
}));

const StyledSection = styled('div')(({ theme }) => ({
	width: '100%',
	maxWidth: 480,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'top',
	paddingTop: '140px',
	boxShadow: theme.customShadows.card,
	backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
	const mdUp = useResponsive('up', 'md');

	const navigate = useNavigate();

	const goToLogin = () => navigate('/login', { replace: true });

	return (
		<>
			<Helmet>
				<title> Register | Minimal UI </title>
			</Helmet>

			<StyledRoot>
				<Logo
					sx={{
						position: 'fixed',
						top: { xs: 16, sm: 24, md: 40 },
						left: { xs: 16, sm: 24, md: 40 },
					}}
				/>

				{mdUp && (
					<StyledSection>
						<Typography
							variant='h3'
							sx={{ px: 5, mt: 10, mb: 5 }}>
							Hola, Bien venido!
						</Typography>
						<img
							src='/assets/illustrations/illustration_login.png'
							alt='login'
						/>
					</StyledSection>
				)}

				<Container maxWidth='sm'>
					<StyledContent>
						<Typography
							variant='h4'
							gutterBottom>
							Regístrate en nuestra App
						</Typography>

						<Typography
							variant='body2'
							sx={{ mb: 2 }}>
							¿Ya tienes una cuenta? {''}
							<Link
								variant='subtitle2'
								onClick={goToLogin}>
								Inicia sesión aquí
							</Link>
						</Typography>

						<RegisterForm />
					</StyledContent>
				</Container>
			</StyledRoot>
		</>
	);
}
