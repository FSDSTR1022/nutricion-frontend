/* eslint-disable arrow-body-style */
import React from 'react';
import Button from '@mui/material/Button';
// import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const NewRutina = ({
	openNewRutina,
	handleNewRutinaClose,
	dateNewRutina,
	action,
}) => {
	return (
		<Dialog
			open={openNewRutina}
			onClose={handleNewRutinaClose}>
			<DialogTitle>{`Fecha:${dateNewRutina} Action:${action}`}</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{ fontWeight: 'Bold', fontSize: 25 }}>
					(Meter Dialog Nueva Rutina)
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleNewRutinaClose}>Cancel</Button>
				<Button onClick={handleNewRutinaClose}>Añadir Rutina</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NewRutina;
