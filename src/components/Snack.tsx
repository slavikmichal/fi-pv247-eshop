import { Alert, AlertColor, IconButton, Snackbar } from '@mui/material';
import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
	severity: AlertColor;
	text: string;
	openInit: boolean;
	onClose: () => void;
};

const Snack: FC<Props> = props => {
	const { severity, text, openInit, onClose } = props;

	return (
		<Snackbar
			open={openInit}
			onClose={onClose}
			autoHideDuration={3000}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert severity={severity as AlertColor} sx={{ width: '100%' }}>
				{text}{' '}
				<IconButton
					size="small"
					aria-label="close"
					color="inherit"
					onClick={() => {
						onClose();
						console.log('close');
					}}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Alert>
		</Snackbar>
	);
};
export default Snack;
