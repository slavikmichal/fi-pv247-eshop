import {
	Alert,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { onSnapshot } from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';

import ProductCheckout from '../components/ProductCheckout';
import Snack from '../components/Snack';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';
import useShoppingBasket from '../hooks/useShoppingBasket';
import useUserInfo from '../hooks/useUserInfo';
import { Product, productsCollection } from '../utils/firebase';

const Checkout = () => {
	const user = useLoggedInUser();
	const basket = useShoppingBasket();
	const userInfo = useUserInfo();

	const [products, setProducts] = useState<Product[]>([]);
	const [deliveryAddress, setDeliveryAddress] = useState<string>('user');
	const [payment, setPayment] = useState<string>('card');
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

	useEffect(() => {
		const unsubscribe = onSnapshot(productsCollection, snapshot => {
			setProducts(snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const getTotalPrice = () => {
		let total = 0;
		const prodHash = products.reduce<Record<string, number>>(
			(acc, product) => ({ ...acc, [product?.id]: product['price-vat'] }),
			{}
		);

		basket?.map(bp => {
			total += prodHash[bp.product_id] * bp.amount;
		});
		return total;
	};

	const handleAddrChange = (e: ChangeEvent) =>
		setDeliveryAddress((e.target as HTMLInputElement).value);

	const handlePaymentChange = (e: ChangeEvent) =>
		setPayment((e.target as HTMLInputElement).value);

	const handleSubmit = () => console.log('handling submit');

	if (!user) {
		return (
			<Alert severity="error" sx={{ width: '100%' }}>
				Please log in to continue shopping.
			</Alert>
		);
	}

	if (!basket?.length) {
		return (
			<Alert severity="info" sx={{ width: '100%' }}>
				Your basket is empty, please add some products first.
			</Alert>
		);
	}

	return (
		<>
			<Typography variant="h4">Checkout</Typography>
			{basket.map(p => (
				<ProductCheckout key={p.product_id} bProduct={p} />
			))}
			<Box component="div" sx={{ textAlign: 'right' }}>
				<Typography variant="h4">Grand Total: {getTotalPrice()} €</Typography>
			</Box>

			<Box component="span" sx={{ border: '1px solid #eaeaea', my: '2rem' }} />

			<FormControl component="fieldset">
				<FormLabel component="legend">Delivery address</FormLabel>
				<RadioGroup
					defaultValue="user"
					name="delivery-address"
					onChange={handleAddrChange}
				>
					<FormControlLabel
						value="user"
						control={<Radio />}
						label="Stored address"
					/>
					<FormControlLabel
						value="custom"
						control={<Radio />}
						label="Custom address"
					/>
				</RadioGroup>
			</FormControl>

			{deliveryAddress === 'user' ? (
				<>
					<Typography component="div">{`${userInfo?.street} ${userInfo?.houseNumber}`}</Typography>
					<Typography component="div">{`${userInfo?.postalCode} ${userInfo?.city}`}</Typography>
				</>
			) : (
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: 500,
						gap: 2
					}}
				>
					<Grid container>
						<Grid item md={9}>
							<TextField
								label="Street"
								{...streetProps}
								type="text"
								sx={{ width: '90%' }}
							/>
						</Grid>
						<Grid item md={3}>
							<TextField label="Number" {...houseNumberProps} type="text" />
						</Grid>
					</Grid>
					<TextField label="City" {...cityProps} type="text" />
					<TextField label="Postal Code" {...postalCodeProps} type="text" />
				</Box>
			)}

			<Box component="span" sx={{ border: '1px solid #eaeaea', my: '2rem' }} />

			<FormControl component="fieldset">
				<FormLabel component="legend">Payment method</FormLabel>
				<RadioGroup
					defaultValue="card"
					name="payment-method"
					onChange={handlePaymentChange}
				>
					<FormControlLabel
						value="card"
						control={<Radio />}
						label="Credit card"
					/>
					<FormControlLabel
						value="transfer"
						control={<Radio />}
						label="Bank transfer"
					/>
					<FormControlLabel
						value="cash"
						control={<Radio />}
						label="Cash on delivery"
					/>
				</RadioGroup>
			</FormControl>

			<Box component="span" sx={{ border: '1px solid #eaeaea', my: '2rem' }} />

			<Box component="div" sx={{ textAlign: 'center' }}>
				<Button type="submit" variant="contained">
					Confirm order
				</Button>
			</Box>
		</>
	);
};
export default Checkout;
