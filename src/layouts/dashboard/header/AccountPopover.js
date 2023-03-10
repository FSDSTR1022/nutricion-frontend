import React, { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
	Box,
	Divider,
	Typography,
	Stack,
	MenuItem,
	Avatar,
	IconButton,
	Popover,
} from '@mui/material';
// mocks_
import account from '../../../_mock/account';
// llamadas al back
import { getUserById } from '../../../services/userService';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: 'Inicio',
		icon: 'eva:home-fill',
	},
	{
		label: 'Perfil',
		icon: 'eva:person-fill',
	},
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
	const [open, setOpen] = useState(null);
	const [user, setUser] = useState({});

	useEffect(() => {
		async function searchUser() {
			const localUser = JSON.parse(localStorage.getItem('user'));
			setUser(await getUserById(localUser.id));
		}
		searchUser();
	}, []);

	const handleOpen = event => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						'&:before': {
							zIndex: 1,
							content: "''",
							width: '100%',
							height: '100%',
							borderRadius: '50%',
							position: 'absolute',
							bgcolor: theme => alpha(theme.palette.grey[900], 0.8),
						},
					}),
				}}>
				<Avatar
					src={user.imgUrl ? user.imgUrl : account.photoURL}
					alt='photoURL'
				/>
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					sx: {
						p: 0,
						mt: 1.5,
						ml: 0.75,
						width: 180,
						'& .MuiMenuItem-root': {
							typography: 'body2',
							borderRadius: 0.75,
						},
					},
				}}>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography
						variant='subtitle2'
						noWrap>
						{user.name}
					</Typography>
					<Typography
						variant='body2'
						sx={{ color: 'text.secondary' }}
						noWrap>
						{user.email}
					</Typography>
				</Box>

				<Divider sx={{ borderStyle: 'dashed' }} />

				<Stack sx={{ p: 1 }}>
					{MENU_OPTIONS.map(option => (
						<MenuItem
							key={option.label}
							onClick={handleClose}>
							{option.label}
						</MenuItem>
					))}
				</Stack>

				<Divider sx={{ borderStyle: 'dashed' }} />

				<MenuItem
					onClick={handleClose}
					sx={{ m: 1 }}>
					Cerrar sesión
				</MenuItem>
			</Popover>
		</>
	);
}
