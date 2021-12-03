import {
	Box,
	Button,
	IconButton,
	Theme,
	Toolbar,
	useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const MyToolbar = () => {
	const theme = useTheme();
	const user = useLoggedInUser();

	const change_theme = (theme: Theme) => {
		theme.palette.mode === 'light'
			? (theme.palette.mode = 'dark')
			: (theme.palette.mode = 'light');
	};

	const light_mode = theme.palette.mode === 'light';
	const app_bar_color = light_mode ? 'inherit' : 'secondary';

	return (
		<Toolbar disableGutters sx={{ gap: 2 }} style={{ minHeight: 30 }}>
			<Button color={app_bar_color} component={Link} to="/">
				Home
			</Button>
			<Button color={app_bar_color} component={Link} to="/products">
				Products
			</Button>
			<Button color={app_bar_color} component={Link} to="/about">
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
	);
};
export default MyToolbar;
