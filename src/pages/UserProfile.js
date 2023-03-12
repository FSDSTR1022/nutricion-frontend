/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
	Stack,
	IconButton,
	InputAdornment,
	TextField,
	Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
// icons
import Iconify from '../components/iconify';
// llamada al back
import { getUserById } from '../services/userService';

// ----------------------------------------------------------------------

export default function UserProfile() {
	const navigate = useNavigate();
	// Mostrar y ocultar contraseña
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);
	// User info
	const [user, setUser] = useState({});

	useEffect(() => {
		async function searchUser() {
			const localUser = JSON.parse(localStorage.getItem('user'));
			console.log('localUser', localUser);
			if (!localUser || !localUser.id) {
				navigate('/login', { replace: true });
				return;
			}
			setUser(await getUserById(localUser.id));
		}
		searchUser();
	}, []);

	const updateAction = () => {
		console.log('Update');
	};

	return (
		<>
			{!user._id ? (
				<Box
					sx={{
						with: '100vw',
						height: '50vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<CircularProgress />
				</Box>
			) : (
				<>
					<h1>User profile</h1>
					<Stack spacing={3}>
						<TextField
							name='firstName'
							label={'Nombre'}
							defaultValue={user.name}
							// onChange={event => setFirstName(event.target.value)}
						/>
						<TextField
							name='lastName'
							label={'Apellidos'}
							defaultValue={user.lastName}
							// onChange={event => setValues('lastName', event.target.value)}
						/>

						<TextField
							name='dni'
							label={'DNI'}
							defaultValue={user.dni}
							// onChange={event => setValues('dni', event.target.value)}
						/>

						<TextField
							name='phone'
							label={'Teléfono'}
							defaultValue={user.phone}
							// onChange={event => setValues('phone', event.target.value)}
						/>

						<TextField
							name='email'
							label={'Correo elecrónico'}
							defaultValue={user.email}
							// onChange={event => setValues('email', event.target.value)}
						/>

						<TextField
							name='password'
							label={'Cambiar Contraseña'}
							type={showPassword ? 'text' : 'password'}
							// onChange={event => setValues('password', event.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge='end'>
											<Iconify
												icon={
													showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
												}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<TextField
							name='repeatPassword'
							label={'Repetir Contraseña'}
							type={showRepeatPassword ? 'text' : 'password'}
							// onChange={event => setValues('repeatPassword', event.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() => setShowRepeatPassword(!showRepeatPassword)}
											edge='end'>
											<Iconify
												icon={
													showRepeatPassword
														? 'eva:eye-fill'
														: 'eva:eye-off-fill'
												}
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
						onClick={updateAction}>
						Actualizar Información
					</LoadingButton>
				</>
			)}
		</>
	);
}
