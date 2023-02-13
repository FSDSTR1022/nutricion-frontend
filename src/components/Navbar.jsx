import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
	const drawerWidth = 240;
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const [navItems, setNavItems] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log('token', token);

		if (!token) {
			setNavItems(['Login', 'Register']);
		} else {
			setNavItems(['Logout']);
		}
	}, []);

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState);
	};

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{ textAlign: 'center' }}>
			<Typography
				variant='h6'
				sx={{ my: 2 }}>
				<Link
					to='/'
					style={{ textDecoration: 'none', color: 'Black' }}>
					Nutrición
				</Link>
			</Typography>
			<Divider />
			<List>
				{navItems.map(item => (
					<ListItem
						key={item}
						disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<ListItemText>
								<Link
									to={`/${item.toLowerCase()}`}
									style={{ textDecoration: 'none', color: 'black' }}>
									{item}
								</Link>
							</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex', marginBottom: '50px' }}>
			<CssBaseline />
			<AppBar component='nav'>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
						<Link
							to='/'
							style={{ textDecoration: 'none', color: 'white' }}>
							Nutrición
						</Link>
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map(item => (
							<Button
								key={item}
								sx={{ color: '#fff' }}>
								<Link
									to={`/${item.toLowerCase()}`}
									style={{ textDecoration: 'none', color: 'white' }}>
									{item}
								</Link>
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component='nav'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
}
