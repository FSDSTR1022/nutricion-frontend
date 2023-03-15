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
import { LoginForm } from '../sections/auth/login';
import fitnessPeople from './image/fitnessPeople.png'

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
	justifyContent: 'center',
	boxShadow: theme.customShadows.card,
	backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
	const mdUp = useResponsive('up', 'md');

	const navigate = useNavigate();

	const goToRegister = () => navigate('/register', { replace: true });

	return (
		<>
			<Helmet>
				<title> Login | Minimal UI </title>
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
							Hola, Bienvenido!
						</Typography>
						<img
							src={fitnessPeople}
							alt='login'
						/>
					</StyledSection>
				)}

				<Container maxWidth='sm'>
					<StyledContent>
						<Typography
							variant='h4'
							gutterBottom>
							Inicia sesión
						</Typography>

						<Typography
							variant='body2'
							sx={{ mb: 5 }}>
							¿No tienes una cuenta? {''}
							<Link
								variant='subtitle2'
								onClick={goToRegister}>
								Regístrate aquí
							</Link>
						</Typography>

						<LoginForm />
					</StyledContent>
				</Container>
			</StyledRoot>
		</>
	);
}
