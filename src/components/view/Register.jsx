import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';

const Register = () => {
	const [nombre, setNombre] = useState('');
	const [nombreError, setNombreError] = useState(false);

	const [apellidos, setApellidos] = useState('');
	const [apellidosError, setApellidosError] = useState(false);

	const [correo, setCorreo] = useState('');
	const [correoError, setCorreoError] = useState(false);

	const [repiteCorreo, setRepiteCorreo] = useState('');
	const [repiteCorreoError, setRepiteCorreoError] = useState(false);

	const [especialidad, setEspecialidad] = useState('');
	const [especialidadError, setEspecialidadError] = useState(false);

	const [contraseña, setContraseña] = useState('');
	const [contraseñaError, setContraseñaError] = useState(false);

	const [repiteContraseña, setRepiteContraseña] = useState('');
	const [repiteContraseñaError, setRepiteContraseñaError] = useState(false);

	const registerAction = () => {
		console.log('nombre',nombre);
		console.log('apellidos',apellidos);
		console.log('correo',correo);
		console.log('repiteCorreo',repiteCorreo);
		console.log('especialidad',especialidad);
		console.log('contraseña',contraseña);
		console.log('repiteContraseña',repiteContraseña);
	}

	const setValues = (type, value) => {
		switch (type) {
			case 'nombre':
				setNombre(value);
				if (value.length) {
					setNombreError(false);
					break;
				}
				setNombreError(true);
				break;
			case 'apellidos':
				setApellidos(value);
				if (value.length) {
					setApellidosError(false);
					break;
				}
				setApellidosError(true);
				break;
			case 'correo':
				setCorreo(value);
				if (value.length) {
					setCorreoError(false);
					break;
				}
				setCorreoError(true);
				break;
			case 'repiteCorreo':
				setRepiteCorreo(value);
				if (value === correo) {
					setRepiteCorreoError(false);
					break;
				}
				setRepiteCorreoError(true);
				break;
			case 'especialidad':
				setEspecialidad(value);
				if (value.length) {
					setEspecialidadError(false);
					break;
				}
				setEspecialidadError(true);
				break;
			case 'contraseña':
				setContraseña(value);
				if (value.length) {
					setContraseñaError(false);
					break;
				}
				setContraseñaError(true);
				break;
			default:
				setRepiteContraseña(value);
				if (value === contraseña) {
					setRepiteContraseñaError(false);
					break;
				}
				setRepiteContraseñaError(true);
		}
	};

	return (
		<section>
			<FormControl
				sx={{ justifyContent: 'center', alignItems: 'center', marginTop:'5rem'}}>
				<TextField
					required
					error={nombreError}
					sx={{ marginBottom: '15px' }}
					id='outlined-basic'
					label='Nombre'
					variant='outlined'
					onChange={event => setValues('nombre', event.target.value)}
				/>
				{nombreError ? <span style={{color:"red"}}>Este campo es obligatorio</span> :<span></span>}
				<TextField
					required
					error={apellidosError}
					sx={{ marginBottom: '15px' }}
					id='outlined-basic'
					label='Apellidos'
					variant='outlined'
					onChange={event => setValues('apellidos', event.target.value)}
				/>
				{apellidosError ? <span style={{color:"red"}}>Este campo es obligatorio</span> :<span></span>}
				<TextField
					required
					error={correoError}
					sx={{ marginBottom: '15px' }}
					id='outlined-basic'
					label='Correo electrónico'
					variant='outlined'
					onChange={event => setValues('correo', event.target.value)}
				/>
				{correoError ? <span style={{color:"red"}}>Este campo es obligatorio</span> :<span></span>}
				<TextField
					required
					error={repiteCorreoError}
					sx={{ marginBottom: '15px' }}
					id='outlined-basic'
					label='Repetir correo'
					variant='outlined'
					onChange={event => setValues('repiteCorreo', event.target.value)}
				/>
				{repiteCorreoError ? <span style={{color:"red"}}>Los correos no coinciden</span> :<span></span>}
				<FormControl sx={{ marginBottom: '15px', minWidth: 225 }}>
					<InputLabel id='selectorEspecialidad'>Especialidad</InputLabel>
					<Select
						error={especialidadError}
						labelId='selectorEspecialidad'
						id='demo-simple-select'
						value={especialidad}
						label='Especialidad'
						onChange={event => setValues('especialidad', event.target.value)}>
						<MenuItem value={'Nutricionista'}>Nutricionista</MenuItem>
						<MenuItem value={'Entrenador'}>Entrenador</MenuItem>
						<MenuItem value={'Ambas'}>Ambas</MenuItem>
					</Select>
				</FormControl>
				{especialidadError ? <span style={{color:"red"}}>Este campo es obligatorio</span> :<span></span>}
				<TextField
					required
					error={contraseñaError}
					sx={{ marginBottom: '15px' }}
					id='outlined-password-input'
					label='Contraseña'
					type='password'
					autoComplete='current-password'
					onChange={event => setValues('contraseña', event.target.value)}
				/>
				{contraseñaError ? <span style={{color:"red"}}>Este campo es obligatorio</span> :<span></span>}
				<TextField
					required
					error={repiteContraseñaError}
					sx={{ marginBottom: '15px' }}
					id='outlined-password-input'
					label='Repetir contraseña'
					type='password'
					autoComplete='current-password'
					onChange={event => setValues('repiteContraseña', event.target.value)}
				/>
				{repiteContraseñaError ? <span style={{color:"red"}}>Las contraseñas no coinciden</span> :<span></span>}
				<FormHelperText
					id='email'
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
