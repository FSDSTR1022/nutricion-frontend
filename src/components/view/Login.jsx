import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { loginUser } from '../../services/excerciseService';
import { useNavigate } from 'react-router-dom';
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

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	function loginSucces(token) {
		const userToken = localStorage.getItem('token');

		if (!userToken) {
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
			localStorage.setItem('token', token);
		}

		setLoading(false);
		navigate('/dashboard');
	}

	const loginAction = () => {
		setLoading(true);
		const userInfo = {};

		userInfo.email = email;
		userInfo.password = password;

		loginUser(userInfo).then(token => loginSucces(token));
	};

	return (
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
						onChange={event => setEmail(event.target.value)}
					/>
					<TextField
						sx={{ marginTop: '25px', marginBottom: '15px' }}
						id='outlined-password-input'
						label='Contraseña'
						type='password'
						autoComplete='current-password'
						onChange={event => setPassword(event.target.value)}
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
						style={{ textDecoration: 'none', color: 'black' }}
						onClick={loginAction}>
						LOGIN
					</Button>
				</FormControl>
			)}
		</section>
	);
};

export default Login;
