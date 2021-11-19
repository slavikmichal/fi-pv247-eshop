import { FC } from 'react';
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

import { ReactComponent as Logo } from './test_logo.svg';

const Layout: FC = ({ children }) => (
	<>
		<AppBar position="relative">
			<Container maxWidth="lg">
				<Toolbar disableGutters sx={{ gap: 2 }} style={{ minHeight: 30 }}>
					<Button color="secondary" component={Link} to="/">
						Home
					</Button>
					<Button color="secondary" component={Link} to="/products">
						Products
					</Button>
					<Button color="secondary" component={Link} to="/about">
						About us
					</Button>
					<Box sx={{ flexGrow: 1 }} />
				</Toolbar>
			</Container>
		</AppBar>

		<Grid
			container
			direction="row"
			sx={{ marginTop: 5 }}
			alignItems="center"
			justifyContent="center"
		>
			<Grid item md={3}>
				<Logo />
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
				<Button
					variant="outlined"
					startIcon={<PersonIcon />}
					sx={{ marginRight: 1 }}
				>
					Login
				</Button>
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
export default Layout;
