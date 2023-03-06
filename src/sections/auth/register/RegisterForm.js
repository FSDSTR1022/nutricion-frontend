import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
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
	const [imgUrlError, setImgUrlError] = useState(false);

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
				if (value.length) {
					setPasswordError(false);
					break;
				}
				setPasswordError(true);
				break;
			case 'repeatPassword':
				setRepeatPassword(value);
				if (value.length && value === password) {
					setRepeatPasswordError(false);
					break;
				}
				setRepeatPasswordError(true);
				break;
			default:
				setImgUrl(value);
				if (value.length) {
					setImgUrlError(false);
					break;
				}
				setImgUrlError(true);
				console.log('imgUrlError', imgUrlError);
		}
	};

	const errorMesage = type => `${type} es un campo obligatorío`;

	const registerAction = () => {
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
