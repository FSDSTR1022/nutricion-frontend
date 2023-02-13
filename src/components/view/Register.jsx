import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { registerUser, getDisciplines } from '../../services/excerciseService';
import { useTheme } from '@mui/material/styles';

function getStyles(disciplineSelected, allDisciplines, theme) {
	return {
		fontWeight:
			allDisciplines.indexOf(disciplineSelected) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const Register = () => {
	const [dni, setDni] = useState('');
	const [dniError, setDniError] = useState(false);

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);

	const [discipline, setDiscipline] = useState([]);
	const [disciplineError, setDisciplineError] = useState(false);

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);

	const [phone, setPhone] = useState(0);
	const [phoneError, setPhoneError] = useState(false);

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const [imgUrl, setImgUrl] = useState('');
	const [imgUrlError, setImgUrlError] = useState(false);

	const [allDisciplines, setAllDisciplines] = useState([]);

	const theme = useTheme();
	const navigate = useNavigate();

	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: 48 * 4.5 + 8,
				width: 250,
			},
		},
	};

	useEffect(() => {
		getDisciplines().then(data => setAllDisciplines(data));
	}, []);

	const errorMesage = 'Campo requerido';

	const registerAction = () => {
		const userInfo = {};

		userInfo.dni = dni;
		userInfo.name = name;
		userInfo.discipline = discipline;
		userInfo.email = email;
		userInfo.phone = phone;
		userInfo.password = password;
		userInfo.imgUrl = imgUrl;

		registerUser(userInfo).then(() => navigate('/'));
	};

	const setValues = (type, value) => {
		switch (type) {
			case 'dni':
				setDni(value);
				if (value.length) {
					setDniError(false);
					break;
				}
				setDniError(true);
				break;
			case 'name':
				setName(value);
				if (value.length) {
					setNameError(false);
					break;
				}
				setNameError(true);
				break;
			case 'discipline':
				setDiscipline(typeof value === 'string' ? value.split(',') : value);
				if (value.length) {
					setDisciplineError(false);
					break;
				}
				setDisciplineError(true);
				break;
			case 'email':
				setEmail(value);
				if (value.length) {
					setEmailError(false);
					break;
				}
				setEmailError(true);
				break;
			case 'phone':
				setPhone(value);
				if (value.length) {
					setPhoneError(false);
					break;
				}
				setPhoneError(true);
				break;
			case 'password':
				setPassword(value);
				if (value.length) {
					setPasswordError(false);
					break;
				}
				setPasswordError(true);
				break;
			default:
				setImgUrl(value);
				if (value.length) {
					setImgUrlError(false);
					break;
				}
				setImgUrlError(true);
		}
	};

	return (
		<section>
			<FormControl
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: '5rem',
				}}>
				<TextField
					required
					error={dniError}
					sx={{ marginBottom: '15px' }}
					id='outlined-basic'
					label={dniError ? errorMesage : 'DNI'}
					variant='outlined'
					onChange={event => setValues('dni', event.target.value)}
				/>
				{dniError ? (
					<span style={{ color: 'red' }}>Este campo es obligatorio</span>
				) : (
					<span></span>
				)}
				<TextField
					required
					error={nameError}
					sx={{ marginBottom: '15px' }}
					id='outlined-basic'
					label='Nombre y Apellidos'
					variant='outlined'
					onChange={event => setValues('name', event.target.value)}
				/>
				{nameError ? (
					<span style={{ color: 'red' }}>Este campo es obligatorio</span>
				) : (
					<span></span>
				)}
				<TextField
					required
					error={phoneError}
					sx={{ marginBottom: '15px' }}
					id='outlined-basic'
					label='Número de Teléfono'
					variant='outlined'
					onChange={event => setValues('phone', event.target.value)}
				/>
				{phoneError ? (
					<span style={{ color: 'red' }}>Este campo es obligatorio</span>
				) : (
					<span></span>
				)}
				<TextField
					required
					error={emailError}
					sx={{ marginBottom: '15px' }}
					id='outlined-basic'
					label='Correo'
					variant='outlined'
					onChange={event => setValues('email', event.target.value)}
				/>
				{emailError ? (
					<span style={{ color: 'red' }}>Este campo es obligatorio</span>
				) : (
					<span></span>
				)}

				<FormControl
					sx={{ marginBottom: '15px', minWidth: 225, maxWidth: 225 }}>
					<InputLabel id='demo-multiple-chip-label'>Especialidad</InputLabel>
					<Select
						labelId='demo-multiple-chip-label'
						id='demo-multiple-chip'
						multiple
						error={disciplineError}
						value={discipline}
						onChange={event => setValues('discipline', event.target.value)}
						input={
							<OutlinedInput
								id='select-multiple-chip'
								label='Parte del Cuerpo Involucrdas'
							/>
						}
						renderValue={selected => (
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
								{selected.map(value => (
									<Chip
										key={value}
										label={allDisciplines.map(item => {
											return item.name;
										})}
									/>
								))}
							</Box>
						)}
						MenuProps={MenuProps}>
						{allDisciplines.map(item => (
							<MenuItem
								key={item._id}
								value={item._id}
								style={getStyles(item, allDisciplines, theme)}>
								{item.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{disciplineError ? (
					<span style={{ color: 'red' }}>Este campo es obligatorio</span>
				) : (
					<span></span>
				)}

				<TextField
					required
					error={passwordError}
					sx={{ marginBottom: '15px' }}
					id='outlined-password-input'
					label='Contraseña'
					type='password'
					autoComplete='current-password'
					onChange={event => setValues('password', event.target.value)}
				/>
				{passwordError ? (
					<span style={{ color: 'red' }}>Este campo es obligatorio</span>
				) : (
					<span></span>
				)}
				<Button
					variant='contained'
					component='label'>
					Upload File
					<input
						type='file'
						hidden
						onChange={event => setValues('imageUrl', event.target.value)}
					/>
				</Button>
				{imgUrlError ? (
					<span style={{ color: 'red' }}>Este campo es obligatorio</span>
				) : (
					<span></span>
				)}
				<FormHelperText
					id='file'
					sx={{ textAlign: 'center', marginBottom: '15px' }}>
					Bienvenido a Nutrición! <br />
					Si ya tienes una cuenta prueba a iniciar sesión aquí.
				</FormHelperText>
				<Button
					variant='outlined'
					style={{ textDecoration: 'none', color: 'black' }}
					onClick={registerAction}>
					REGISTRARSE
				</Button>
			</FormControl>
		</section>
	);
};

export default Register;
