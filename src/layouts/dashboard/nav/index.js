import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
	Box,
	Link,
	Drawer,
	Typography,
	Avatar,
	Divider,
	Stack,
	MenuItem,
	Popover,
} from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfigProfessional from './configProfessional';
import navConfigPatient from './configPatient';
// llamadas al back
import { getUserById } from '../../../services/userService';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

Nav.propTypes = {
	openNav: PropTypes.bool,
	onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
	const { pathname } = useLocation();
	const isDesktop = useResponsive('up', 'lg');
	const navigate = useNavigate();

	const [open, setOpen] = useState(null);
	const [user, setUser] = useState({});

	useEffect(() => {
		if (openNav) {
			onCloseNav();
		}

		async function searchUser() {
			const localUser = JSON.parse(localStorage.getItem('user'));
			if (!localUser || !localUser.id) {
				navigate('/login', { replace: true });
				return;
			}
			setUser(await getUserById(localUser.id));
		}
		searchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleOpen = event => {
		setOpen(event.currentTarget);
	};

	const goToInicio = () => {
		navigate('/dashboard', { replace: true });
		setOpen(null);
	};

	const goToPerfil = () => {
		navigate('/dashboard/profile', { replace: true });
		setOpen(null);
	};

	const goToSignOut = () => {
		localStorage.removeItem('user');
		navigate('/landing', { replace: true });
		setOpen(null);
	};

	const handleClose = () => {
		setOpen(null);
	};

	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				'& .simplebar-content': {
					height: 1,
					display: 'flex',
					flexDirection: 'column',
				},
			}}>
			<Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
				<Logo />
			</Box>

			<Box sx={{ mb: 5, mx: 2.5 }}>
				<Link underline='none'>
					<StyledAccount onClick={handleOpen}>
						<Avatar
							src={user.imgUrl}
							alt='photoURL'
						/>

						<Box sx={{ ml: 2 }}>
							<Typography
								variant='subtitle2'
								sx={{ color: 'text.primary' }}>
								{user.name}
							</Typography>

							<Typography
								variant='body2'
								sx={{ color: 'text.secondary' }}>
								{user.email}
							</Typography>
						</Box>
					</StyledAccount>
					<Popover
						open={Boolean(open)}
						anchorEl={open}
						onClose={handleClose}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						PaperProps={{
							sx: {
								p: 0,
								mt: 1.5,
								ml: 0.75,
								width: 240,
								'& .MuiMenuItem-root': {
									typography: 'body2',
									borderRadius: 0.75,
								},
							},
						}}>
						<Divider sx={{ borderStyle: 'dashed' }} />

						<Stack sx={{ p: 1 }}>
							<MenuItem onClick={goToInicio}>{'Inicio'}</MenuItem>
							<MenuItem onClick={goToPerfil}>{'Perfil'}</MenuItem>
						</Stack>

						<Divider sx={{ borderStyle: 'dashed' }} />

						<MenuItem
							onClick={goToSignOut}
							sx={{ m: 1 }}>
							Cerrar sesión
						</MenuItem>
					</Popover>
				</Link>
			</Box>

			{user.userType === 'profesional' ? (
				<NavSection data={navConfigProfessional} />
			) : (
				<NavSection data={navConfigPatient} />
			)}

			<Box sx={{ flexGrow: 1 }} />
		</Scrollbar>
	);

	return (
		<Box
			component='nav'
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV_WIDTH },
			}}>
			{isDesktop ? (
				<Drawer
					open
					variant='permanent'
					PaperProps={{
						sx: {
							width: NAV_WIDTH,
							bgcolor: 'background.default',
							borderRightStyle: 'dashed',
						},
					}}>
					{renderContent}
				</Drawer>
			) : (
				<Drawer
					open={openNav}
					onClose={onCloseNav}
					ModalProps={{
						keepMounted: true,
					}}
					PaperProps={{
						sx: { width: NAV_WIDTH },
					}}>
					{renderContent}
				</Drawer>
			)}
		</Box>
	);
}
