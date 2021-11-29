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
	InputBase
} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { getDoc } from 'firebase/firestore';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';
import { ReactComponent as CompanyLogo } from '../resources/logo_short.svg';
// import LogInDialog from './LogInDialog';

const Layout: FC = ({ children }) => {
	const user = useLoggedInUser();
	const [openDialog, setOpenDialog] = useState<boolean>(false);

	return (
		<>
			<AppBar position="relative">
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ gap: 2 }} style={{ minHeight: 30 }}>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button
							color="inherit"
							component={Link}
							to="/products"
							variant="text"
						>
							Products
						</Button>
						<Button color="inherit" component={Link} to="/about" variant="text">
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
				<Grid item md={3} sx={{ marginRight: 8 }}>
					<CompanyLogo style={{ maxHeight: 90 }} />
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
							variant="outlined"
							startIcon={<PersonIcon />}
							sx={{ marginRight: 1 }}
							onClick={() => setOpenDialog(true)}
						>
							Login
						</Button>
					)}
					{/* <LogInDialog open={openDialog} onClose={() => setOpenDialog(false)} /> */}
					<Button variant="outlined" startIcon={<ShoppingBasketIcon />}>
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
