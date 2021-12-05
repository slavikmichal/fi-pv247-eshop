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
import { useTranslation } from '../hooks/useTranslation';

import LanguageSwitch from './LanguageSwitch';

type Props = {
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const MyToolbar: FC<Props> = ({ setTheme, children }) => {
	const theme = useTheme();
	const user = useLoggedInUser();
	const t = useTranslation();

	return (
		<Toolbar disableGutters sx={{ gap: 2 }} style={{ minHeight: 30 }}>
			<Button color="inherit" component={Link} to="/">
				{t('home')}
			</Button>
			<Button color="inherit" component={Link} to="/products">
				{t('products')}
			</Button>
			<Button color="inherit" component={Link} to="/about">
				{t('about')}
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
			{theme.palette.mode === 'light' ? (
				<IconButton onClick={() => setTheme(darkTheme)}>
					<DarkModeIcon />
				</IconButton>
			) : (
				<IconButton onClick={() => setTheme(lightTheme)}>
					<LightModeIcon />
				</IconButton>
			)}
			<LanguageSwitch />
		</Toolbar>
	);
};
export default MyToolbar;
