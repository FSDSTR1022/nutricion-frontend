import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/home');
		} 
	}, []);

	return (
	<section>
		<h1>Si Token</h1>
	</section>
	)
};

export default Dashboard;
