import { Button, Grid, useTheme, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoLight } from '../resources/logo_light.svg';
import { ReactComponent as LogoDark } from '../resources/logo_dark.svg';
import useLoggedInUser from '../hooks/useLoggedInUser';

import BasketDialog from './BasketDialog';
import LogInDialog from './LogInDialog';
import SearchBar from './SearchBar';

const MainHeader = () => {
	const theme = useTheme();
	const user = useLoggedInUser();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [openBasketDialog, setOpenBasketDialog] = useState<boolean>(false);

	return (
		<Grid
			container
			direction="row"
			sx={{ marginTop: 5 }}
			alignItems="center"
			justifyContent="center"
			overflow="visible"
		>
			<Grid item md={3} sx={{ margin: 2 }}>
				<Box component={Link} to="/">
					{theme.palette.mode === 'light' ? (
						<LogoLight style={{ maxHeight: 90 }} />
					) : (
						<LogoDark style={{ maxHeight: 90 }} />
					)}
				</Box>
			</Grid>

			<Grid item md={4}>
				<SearchBar />
			</Grid>

			<Grid item md={3} sx={{ textAlign: 'right' }}>
				{!user && (
					<>
						<Button
							variant="outlined"
							startIcon={<PersonIcon />}
							sx={{ marginRight: 1 }}
							onClick={() => setOpenDialog(true)}
						>
							Login
						</Button>
						<LogInDialog
							open={openDialog}
							onClose={() => setOpenDialog(false)}
						/>
					</>
				)}
				{user && (
					<>
						<Button
							variant="outlined"
							startIcon={<ShoppingBasketIcon />}
							onClick={() => setOpenBasketDialog(true)}
						>
							Basket
						</Button>
						<BasketDialog
							open={openBasketDialog}
							onClose={() => setOpenBasketDialog(false)}
						/>
					</>
				)}
			</Grid>
		</Grid>
	);
};
export default MainHeader;
