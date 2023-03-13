/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
	Stack,
	IconButton,
	InputAdornment,
	TextField,
	Box,
	Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
// icons
import Iconify from '../components/iconify';
// llamada al back
import { getUserById, updateUser } from '../services/userService';

// ----------------------------------------------------------------------

export default function UserProfile() {
	const navigate = useNavigate();
	// Mostrar y ocultar contraseña
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);
	const [repeatPasswordError, setRepeatPasswordError] = useState(false);
	// User info
	const [user, setUser] = useState({});
	// Información formulario
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dni, setDni] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [imgUrl, setImgUrl] = useState('');

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
		if (
			(!password.length && repeatPassword.length) ||
			password !== repeatPassword
		) {
			setRepeatPasswordError(true);
			return;
		}

		const localUser = JSON.parse(localStorage.getItem('user'));

		const userInfo = {};

		userInfo.id = localUser.id;
		userInfo.name = firstName;
		userInfo.lastName = lastName;
		userInfo.dni = dni;
		userInfo.phone = phone;
		userInfo.email = email;
		userInfo.password = password;
		userInfo.imgUrl = imgUrl;

		const objValues = Object.values(userInfo);
		const objKeys = Object.keys(userInfo);

		for (let i = 0; i < objValues.length; i++) {
			if (!objValues[i].length) {
				delete userInfo[objKeys[i]];
			}
		}

		updateUser(userInfo).then(() => {
			window.location.replace('');
		});
	};

	// Asignar valores a las variables y hacer validación
	const setValues = (type, value) => {
		switch (type) {
			case 'firstName':
				setFirstName(value);
				break;
			case 'lastName':
				setLastName(value);
				break;
			case 'dni':
				setDni(value);
				break;
			case 'phone':
				setPhone(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				if (!value.length && !repeatPassword.length) {
					setRepeatPasswordError(false);
					break;
				}
				if (!value.length || value !== repeatPassword) {
					setRepeatPasswordError(true);
					break;
				}
				setRepeatPasswordError(false);
				break;
			case 'repeatPassword':
				setRepeatPassword(value);
				if (password === value) {
					setRepeatPasswordError(false);
					break;
				}
				setRepeatPasswordError(true);
				break;
			default:
				setImgUrl(value);
		}
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
					<h1>Mi Perfil</h1>
					<Stack spacing={3}>
						<TextField
							name='firstName'
							label={'Nombre'}
							defaultValue={user.name}
							onChange={event => setValues('firstName', event.target.value)}
						/>
						<TextField
							name='lastName'
							label={'Apellidos'}
							defaultValue={user.lastName}
							onChange={event => setValues('lastName', event.target.value)}
						/>

						<TextField
							name='dni'
							label={'DNI'}
							defaultValue={user.dni}
							onChange={event => setValues('dni', event.target.value)}
						/>

						<TextField
							name='phone'
							label={'Teléfono'}
							defaultValue={user.phone}
							onChange={event => setValues('phone', event.target.value)}
						/>

						<TextField
							name='email'
							label={'Correo elecrónico'}
							defaultValue={user.email}
							onChange={event => setValues('email', event.target.value)}
						/>

						<TextField
							name='password'
							label={'Cambiar Contraseña'}
							type={showPassword ? 'text' : 'password'}
							onChange={event => setValues('password', event.target.value)}
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
							label={
								repeatPasswordError
									? 'Las contraseñas deben ser iguales'
									: 'Repetir Contraseña'
							}
							error={repeatPasswordError}
							type={showRepeatPassword ? 'text' : 'password'}
							onChange={event =>
								setValues('repeatPassword', event.target.value)
							}
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
						<Box>
							<span>Actualice aquí su imagen de perfil</span>
							<Button
								variant='contained'
								sx={{ mx: 4 }}
								component='label'>
								Selecciona una imagen
								<input
									type='file'
									hidden
								/>
							</Button>
						</Box>
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
