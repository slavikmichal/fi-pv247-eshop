import { FC } from 'react';
import { AppBar, Container, Theme } from '@mui/material';

import { useSnackState } from '../hooks/useSnack';

import Snack from './Snack';
import MyToolbar from './MyToolbar';
import MainHeader from './MainHeader';

type Props = {
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const Layout: FC<Props> = ({ setTheme, children }) => {
	const snackState = useSnackState();

	return (
		<>
			{snackState && <Snack {...snackState} />}
			<AppBar position="relative">
				<Container maxWidth="lg">
					<MyToolbar setTheme={setTheme} />
				</Container>
			</AppBar>

			<MainHeader />

			<Container
				maxWidth="lg"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					pt: 8,
					gap: 2,
					mb: 20
				}}
			>
				{children}
			</Container>
		</>
	);
};

export default Layout;
