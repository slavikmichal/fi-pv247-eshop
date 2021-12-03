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
import { FC } from 'react';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';
import { lightTheme, darkTheme } from '../utils/theme';

type Props = {
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const MyToolbar: FC<Props> = ({ setTheme, children }) => {
	const theme = useTheme();
	const user = useLoggedInUser();

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
				<IconButton onClick={() => setTheme(darkTheme)}>
					<DarkModeIcon />
				</IconButton>
			) : (
				<IconButton onClick={() => setTheme(lightTheme)}>
					<LightModeIcon />
				</IconButton>
			)}
		</Toolbar>
	);
};
export default MyToolbar;
