import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const FullLoader = () => (
	<Box
		sx={{
			display: 'flex',
			width: '100vw',
			height: '100vh',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
		<CircularProgress />
	</Box>
);

const loading = false;

const Login = () => (
	<section>
		{loading ? (
			<FullLoader />
		) : (
			<FormControl
				sx={{ justifyContent: 'center', alignItems: 'center', my: '35vh' }}>
				<TextField
					id='outlined-basic'
					label='Correo Electónico'
					variant='outlined'
				/>
				<TextField
					sx={{ marginTop: '25px', marginBottom: '15px' }}
					id='outlined-password-input'
					label='Contraseña'
					type='password'
					autoComplete='current-password'
				/>
				<FormHelperText
					id='email'
					sx={{ textAlign: 'center', marginBottom: '15px' }}>
					Bienvenido a Nutrición! <br />
					Si no está registraso prueba a registrarse
					<Link
						to={'/register'}
						className='btn btn-primary'
						style={{ textDecoration: 'none', color: 'black' }}>
						registrarse
					</Link>
					.
				</FormHelperText>
				<Button
					variant='outlined'
					style={{ textDecoration: 'none', color: 'black' }}>
					LOGIN
				</Button>
			</FormControl>
		)}
	</section>
);

export default Login;
