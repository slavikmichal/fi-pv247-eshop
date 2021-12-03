import {
	Button,
	Grid,
	IconButton,
	InputBase,
	Paper,
	useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useState } from 'react';

import { ReactComponent as LogoLight } from '../resources/logo_light.svg';
import { ReactComponent as LogoDark } from '../resources/logo_dark.svg';
import useLoggedInUser from '../hooks/useLoggedInUser';

import BasketDialog from './BasketDialog';
import LogInDialog from './LogInDialog';

const MainHeader = () => {
	const theme = useTheme();
	const user = useLoggedInUser();
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [openBasketDialog, setOpenBasketDialog] = useState<boolean>(false);

	const light_mode = theme.palette.mode === 'light';
	const color = light_mode ? 'primary' : 'secondary';

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
					<>
						<Button
							color={color}
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
							color={color}
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
