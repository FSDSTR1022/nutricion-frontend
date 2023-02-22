import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Logout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem('token');
		navigate('/');
		window.location.reload(false);
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				width: '100vw',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<CircularProgress />
		</Box>
	);
};

export default Logout;
