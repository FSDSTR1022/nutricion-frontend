import { useState } from 'react';
// @mui
import { TextField, FormControl, Button } from '@mui/material';
// components
import { registerUser } from '../../services/userService';

const FormNewPatient = props => {
	// conseguir datos del usuario
	const user = JSON.parse(localStorage.getItem('user'));

	// Información formulario
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dni, setDni] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	// Validación formulario
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [dniError, setDniError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [emailError, setEmailError] = useState(false);
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
		if (!firstName.length) setFirstNameError(true);
		if (!lastName.length) setLastNameError(true);
		if (!firstName.length) setDniError(true);
		if (!phone.length) setPhoneError(true);
		if (!email.length) setEmailError(true);

		if (
			firstNameError ||
			!firstName.length ||
			lastNameError ||
			!lastName.length ||
			dniError ||
			!dni.length ||
			phoneError ||
			!phone.length ||
			emailError ||
			!email.length
		) {
			return;
		}

		const userInfo = {};

		userInfo.name = firstName;
		userInfo.lastName = lastName;
		userInfo.dni = dni;
		userInfo.phone = phone;
		userInfo.email = email;
		userInfo.isActive = true;
		userInfo.userType = 'patient';
		userInfo.imgUrl = imgUrl;

		// Agregamos el id del profesional que lo crea
		userInfo.professional = user.id;

		// Agregamos contraseña aleatoría.
		userInfo.password =
			Math.random().toString(36).slice(2) +
			Math.random().toString(36).toUpperCase().slice(2);

		console.log('userInfo', userInfo);

		// registerUser(userInfo).then(() => console.log('Hola'));
		registerUser(userInfo);
		props.onClose();
	};
	return (
		<>
			<div>
				<h2>Nuevo Paciente</h2>
				<form>
					<FormControl
						required
						fullWidth
						sx={{ m: 1 }}>
						<TextField
							sx={{ m: 1 }}
							name='firstName'
							error={firstNameError}
							label={firstNameError ? errorMesage('Nombre') : 'Nombre'}
							onChange={event => setValues('firstName', event.target.value)}
						/>
						<TextField
							sx={{ m: 1 }}
							name='lastName'
							label={lastNameError ? errorMesage('Apellidos') : 'Apellidos'}
							error={lastNameError}
							onChange={event => setValues('lastName', event.target.value)}
						/>

						<TextField
							sx={{ m: 1 }}
							name='dni'
							label={dniError ? errorMesage('DNI') : 'DNI'}
							error={dniError}
							onChange={event => setValues('dni', event.target.value)}
						/>

						<TextField
							sx={{ m: 1 }}
							name='phone'
							label={phoneError ? errorMesage('Teléfono') : 'Teléfono'}
							error={phoneError}
							onChange={event => setValues('phone', event.target.value)}
						/>

						<TextField
							sx={{ m: 1 }}
							name='email'
							label={
								emailError
									? errorMesage('Correo elecrónico')
									: 'Correo elecrónico'
							}
							error={emailError}
							onChange={event => setValues('email', event.target.value)}
						/>
					</FormControl>

					<Button
						variant='contained'
						onClick={() => {
							registerAction();
						}}>
						Guardar Nuevo Paciente
					</Button>
				</form>
			</div>
		</>
	);
};

export default FormNewPatient;
