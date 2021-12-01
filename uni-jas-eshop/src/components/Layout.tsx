import { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	IconButton,
	Grid,
	Paper,
	InputBase,
	useTheme,
	Theme
} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { getDoc } from 'firebase/firestore';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';
import { ReactComponent as LogoLight } from '../resources/logo_light.svg';
import { ReactComponent as LogoDark } from '../resources/logo_dark.svg';

import LogInDialog from './LogInDialog';

const Layout: FC = ({ children }) => {
	const user = useLoggedInUser();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const theme = useTheme();
	const change_theme = (theme: Theme) => {
		theme.palette.mode === 'light'
			? (theme.palette.mode = 'dark')
			: (theme.palette.mode = 'light');
	};

	const light_mode = theme.palette.mode === 'light';
	const app_bar_color = light_mode ? 'inherit' : 'secondary';
	const color = light_mode ? 'primary' : 'secondary';

	return (
		<>
			<AppBar position="relative">
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ gap: 2 }} style={{ minHeight: 30 }}>
						<Button color={app_bar_color} component={Link} to="/">
							Home
						</Button>
						<Button color={app_bar_color} component={Link} to="/products">
							Products
						</Button>
						<Button
							color={app_bar_color}
							component={Link}
							to="/about"
							variant="text"
						>
							About us
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						{user && (
							<Box component="span">
								{user.email}{' '}
								<IconButton onClick={signOut}>
									<LogoutIcon />
								</IconButton>
							</Box>
						)}
						{light_mode ? (
							<IconButton onClick={() => change_theme(theme)}>
								<DarkModeIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => change_theme(theme)}>
								<LightModeIcon />
							</IconButton>
						)}
					</Toolbar>
				</Container>
			</AppBar>

			<Grid
				container
				direction="row"
				sx={{ marginTop: 5 }}
				alignItems="center"
				justifyContent="center"
				overflow="visible"
			>
				<Grid item md={3} sx={{ margin: 2 }}>
					{theme.palette.mode === 'light' ? (
						<LogoLight style={{ maxHeight: 90 }} />
					) : (
						<LogoDark style={{ maxHeight: 90 }} />
					)}
				</Grid>
				<Grid item md={3}>
					<Paper
						component="div"
						sx={{
							p: '2px 4px',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Search"
							inputProps={{ 'aria-label': 'search' }}
						/>
						<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
							<SearchIcon />
						</IconButton>
					</Paper>
				</Grid>
				<Grid item md={3} sx={{ textAlign: 'right' }}>
					{!user && (
						<Button
							color={color}
							variant="outlined"
							startIcon={<PersonIcon />}
							sx={{ marginRight: 1 }}
							onClick={() => setOpenDialog(true)}
						>
							Login
						</Button>
					)}
					<LogInDialog open={openDialog} onClose={() => setOpenDialog(false)} />
					<Button
						color={color}
						variant="outlined"
						startIcon={<ShoppingBasketIcon />}
					>
						Basket
					</Button>
				</Grid>
			</Grid>

			<Container
				maxWidth="lg"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					//justifyContent: 'flex-start',
					//alignItems: 'flex-start',
					height: '100vh',
					pt: 8,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};

export default Layout;
