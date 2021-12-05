import {
	Dialog,
	Typography,
	TextField,
	Paper,
	Box,
	Button,
	CircularProgress,
	Link,
	Grid
} from '@mui/material';
import { FC, FormEvent, useState } from 'react';

import useField from '../hooks/useField';
import { useTranslation } from '../hooks/useTranslation';
import { saveUserInfo, signIn, signUp } from '../utils/firebase';

type LogInDialogProps = {
	open: boolean;
	onClose: () => void;
};

const LogInDialog: FC<LogInDialogProps> = props => {
	const { open, onClose } = props;

	const [isSignUp, setSignUp] = useState(false);
	const [email, clearEmail, usernameProps] = useField('email', true);
	const [password, clearPassword, passwordProps] = useField('password', true);
	const [city, clearCity, cityProps] = useField('city', true);
	const [houseNumber, clearHouseNumber, houseNumberProps] = useField(
		'houseNumber',
		true
	);
	const [street, clearStreet, streetProps] = useField('streetNumber', true);
	const [postalCode, clearPostalCode, postalCodeProps] = useField(
		'postalCode',
		true
	);
	const [phone, clearPhone, phoneProps] = useField('phone', true);
	const [submitError, setSubmitError] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const t = useTranslation();

	const clearForm = () => {
		setSubmitError('');
		setSignUp(false);
		clearEmail();
		clearPassword();
		clearCity();
		clearHouseNumber();
		clearStreet();
		clearPostalCode();
		clearPhone();
	};

	const handleSubmit = async (e: FormEvent) => {
		setSubmitError('');
		e.preventDefault();
		try {
			setLoading(true);
			if (isSignUp) {
				await signUp(email, password);
				await saveUserInfo({
					email,
					city,
					houseNumber,
					street,
					postalCode,
					phone
				});
			} else {
				await signIn(email, password);
			}
			setLoading(false);
			onClose();
			clearForm();
		} catch (err) {
			setLoading(false);
			setSubmitError(
				(err as { message?: string })?.message ?? 'Unknown error.'
			);
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<Paper
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: 500,
					p: 4,
					gap: 2
				}}
			>
				<Typography variant="h4" component="h2" textAlign="center" mb={3}>
					{t('sign_in')}
				</Typography>
				<TextField label={t('email')} {...usernameProps} type="email" />
				<TextField label={t('pwd')} {...passwordProps} type="password" />
				{isSignUp && (
					<>
						<TextField label={t('phone')} {...phoneProps} type="tel" />
						<Grid container>
							<Grid item md={9}>
								<TextField
									label={t('street')}
									{...streetProps}
									type="text"
									sx={{ width: '90%' }}
								/>
							</Grid>
							<Grid item md={3}>
								<TextField
									label={t('number')}
									{...houseNumberProps}
									type="text"
								/>
							</Grid>
						</Grid>
						<TextField label={t('city')} {...cityProps} type="text" />
						<TextField
							label={t('postal_code')}
							{...postalCodeProps}
							type="text"
						/>
					</>
				)}
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
						alignSelf: 'flex-end',
						mt: 2
					}}
				>
					{loading && <CircularProgress size={30} />}
					{submitError && (
						<Typography
							variant="caption"
							textAlign="right"
							sx={{ color: 'error.main' }}
						>
							{submitError}
						</Typography>
					)}
					<Link href="#" onClick={() => setSignUp(!isSignUp)}>
						{isSignUp ? t('login') : t('signup')}
					</Link>
					<Button type="submit" variant="contained">
						{isSignUp ? t('signup') : t('login')}
					</Button>
				</Box>
			</Paper>
		</Dialog>
	);
};

export default LogInDialog;
