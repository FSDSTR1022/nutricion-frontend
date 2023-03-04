/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	OutlinedInput,
	Chip,
	Button,
	Grid,
	Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme, styled } from '@mui/material/styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ConstructionOutlined } from '@mui/icons-material';
import {
	getExerciseAtribut,
	saveExercise,
	updateExercise,
} from '../../services/exerciseService';

const FormExercise = props => {
	return (
		<>
			<h1>Nuevo Paciente</h1>
		</>
	);
};

export default FormExercise;
