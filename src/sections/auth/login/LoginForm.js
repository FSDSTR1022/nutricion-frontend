import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// llamadas al back
import { loginUser } from '../../../services/userService';

// ----------------------------------------------------------------------

export default function LoginForm() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const loginAction = () => {
		if (!email.length && !password.length) {
			return;
		}

		const userInfo = {};

		userInfo.email = email;
		userInfo.password = password;

		loginUser({ email, password }).then(data => {
			if (!data.succes) {
				return;
			}

			// guardar token en local host
			if (localStorage.getItem('user')) {
				localStorage.removeItem('user');
			}
			localStorage.setItem('user', JSON.stringify(data.user));

			// redirigir a la url del dashboard
			navigate('/dashboard', { replace: true });
		});
	};

	return (
		<>
			<Stack spacing={3}>
				<TextField
					name='email'
					label='Correo elecrónico'
					onChange={event => setEmail(event.target.value)}
				/>

				<TextField
					name='password'
					label='Contraseña'
					type={showPassword ? 'text' : 'password'}
					onChange={event => setPassword(event.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={() => setShowPassword(!showPassword)}
									edge='end'>
									<Iconify
										icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
									/>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<LoadingButton
				sx={{ my: 2 }}
				fullWidth
				size='large'
				type='submit'
				variant='contained'
				onClick={loginAction}>
				Login
			</LoadingButton>
		</>
	);
}
