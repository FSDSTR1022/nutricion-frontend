import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
	Stack,
	IconButton,
	InputAdornment,
	TextField,
	Box,
	Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import Iconify from '../../../components/iconify';
// components
import { registerUser, loginUser } from '../../../services/userService';

// ----------------------------------------------------------------------

export default function RegisterForm() {
	const navigate = useNavigate();

	// Mostrar y ocultar contraseña
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);

	// Información formulario
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dni, setDni] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	// Validación formulario
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [dniError, setDniError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [repeatPasswordError, setRepeatPasswordError] = useState(false);

	// Asignar valores a las variables y hacer validación
	const setValues = (type, value) => {
		switch (type) {
			case 'firstName':
				setFirstName(value);
				if (value.length) {
					setFirstNameError(false);
					break;
				}
				setFirstNameError(true);
				break;
			case 'lastName':
				setLastName(value);
				if (value.length) {
					setLastNameError(false);
					break;
				}
				setLastNameError(true);
				break;
			case 'dni':
				setDni(value);
				if (value.length) {
					setDniError(false);
					break;
				}
				setDniError(true);
				break;
			case 'phone':
				setPhone(value);
				if (value.length) {
					setPhoneError(false);
					break;
				}
				setPhoneError(true);
				break;
			case 'email':
				setEmail(value);
				if (value.length) {
					setEmailError(false);
					break;
				}
				setEmailError(true);
				break;
			case 'password':
				setPassword(value);
				if (value === repeatPassword) {
					setPasswordError(false);
					setRepeatPasswordError(false);
					break;
				}
				setRepeatPasswordError(true);
				break;
			case 'repeatPassword':
				setRepeatPassword(value);
				if (value === password) {
					setPasswordError(false);
					setPasswordError(false);
					setRepeatPasswordError(false);
					break;
				}
				setRepeatPasswordError(true);
				break;
			default:
				if (!firstName?.length) setFirstNameError(true);
				if (!lastName?.length) setLastNameError(true);
				if (!dni?.length) setDniError(true);
				if (!phone?.length) setPhoneError(true);
				if (!email?.length) setEmailError(true);
				if (!password?.length) setPasswordError(true);
				if (repeatPassword === password) {
					setPasswordError(false);
					setPasswordError(false);
					setRepeatPasswordError(false);
					break;
				}
				setRepeatPasswordError(true);
				break;
		}
	};

	// imagen
	const urlCloudinary =
		'https://api.cloudinary.com/v1_1/dtnuuoiih/image/upload/'; // aquí deberí ir >process.env.URL_CLOUDINARY_IMG

	const upLoadImage = image => {
		const data = new FormData();

		data.append('file', image);
		data.append('upload_preset', 'x12akkid');
		data.append('cloud_name', 'dtnuuoiih');
		data.append('folder', 'exercises/images');

		fetch(urlCloudinary, {
			method: 'post',
			body: data,
		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					return;
				}

				setImgUrl(data.url);
			})

			.catch(err => console.log('error', err));
	};

	const errorMesage = type => `${type} es un campo obligatorío`;

	const registerAction = () => {
		setValues('verificar');

		if (
			firstNameError ||
			lastNameError ||
			dniError ||
			phoneError ||
			emailError ||
			passwordError ||
			repeatPasswordError
		) {
			return;
		}

		const userInfo = {};

		userInfo.name = firstName;
		userInfo.lastName = lastName;
		userInfo.dni = dni;
		userInfo.phone = phone;
		userInfo.email = email;
		userInfo.password = repeatPassword;
		userInfo.isActive = true;
		userInfo.userType = 'profesional';
		userInfo.imgUrl = imgUrl;

		registerUser(userInfo).then(() =>
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
			})
		);
	};

	return (
		<>
			<Stack spacing={3}>
				<TextField
					name='firstName'
					error={firstNameError}
					label={firstNameError ? errorMesage('Nombre') : 'Nombre'}
					onChange={event => setValues('firstName', event.target.value)}
				/>
				<TextField
					name='lastName'
					label={lastNameError ? errorMesage('Apellidos') : 'Apellidos'}
					error={lastNameError}
					onChange={event => setValues('lastName', event.target.value)}
				/>

				<TextField
					name='dni'
					label={dniError ? errorMesage('DNI') : 'DNI'}
					error={dniError}
					onChange={event => setValues('dni', event.target.value)}
				/>

				<TextField
					name='phone'
					label={phoneError ? errorMesage('Teléfono') : 'Teléfono'}
					error={phoneError}
					onChange={event => setValues('phone', event.target.value)}
				/>

				<TextField
					name='email'
					label={
						emailError ? errorMesage('Correo elecrónico') : 'Correo elecrónico'
					}
					error={emailError}
					onChange={event => setValues('email', event.target.value)}
				/>

				<TextField
					name='password'
					error={passwordError}
					label={passwordError ? errorMesage('Contraseña') : 'Contraseña'}
					type={showPassword ? 'text' : 'password'}
					onChange={event => setValues('password', event.target.value)}
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

				<TextField
					name='repeatPassword'
					error={repeatPasswordError}
					label={
						repeatPasswordError
							? errorMesage('Repetir Contraseña')
							: 'Repetir Contraseña'
					}
					type={showRepeatPassword ? 'text' : 'password'}
					onChange={event => setValues('repeatPassword', event.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={() => setShowRepeatPassword(!showRepeatPassword)}
									edge='end'>
									<Iconify
										icon={
											showRepeatPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
										}
									/>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Stack>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: '15px',
				}}>
				<span>Agrege su imagen de perfil aquí</span>
				<img
					style={{
						marginTop: 10,
						width: 220,
						height: 220,
						objectFit: 'cover',
					}}
					src={
						imgUrl ||
						'https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg'
					}
					alt={'IMGEN USUARIO'}
					loading='lazy'
				/>
				<br />
				<Button
					style={{ width: 220 }}
					id='imagenButton'
					variant='contained'
					component='label'>
					Selecciona una imagen
					<input
						hidden
						onChange={file => upLoadImage(file.target.files[0])}
						accept='image/*'
						multiple
						type='file'
					/>
				</Button>
			</Box>
			<LoadingButton
				sx={{ my: 2 }}
				fullWidth
				size='large'
				type='submit'
				variant='contained'
				onClick={registerAction}>
				Register
			</LoadingButton>
		</>
	);
}
