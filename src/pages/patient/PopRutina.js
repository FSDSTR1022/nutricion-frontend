/* eslint-disable arrow-body-style */
import React from 'react';
import Button from '@mui/material/Button';
// import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PopRutina = ({ openEvent, handleEventClose, rutina, action }) => {
	return (
		<div>
			<Dialog
				open={openEvent}
				onClose={handleEventClose}>
				<DialogTitle sx={{ fontWeight: 'bold', fontSize: 30 }}>
					{rutina.name}
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ fontWeight: 'Bold', fontSize: 25 }}>
						{`rutina: ${rutina.name}---action: ${action}`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleEventClose}>Cancel</Button>
					<Button onClick={handleEventClose}>Editar Rutina</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default PopRutina;
