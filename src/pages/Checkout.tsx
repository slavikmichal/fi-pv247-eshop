import { User } from '@firebase/auth';
import {
	Alert,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { addDoc, onSnapshot } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ProductCheckout from '../components/ProductCheckout';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';
import useShoppingBasket from '../hooks/useShoppingBasket';
import { useTranslation } from '../hooks/useTranslation';
import useUserInfo from '../hooks/useUserInfo';
import {
	OrderType,
	orderCollection,
	orderDocument,
	Product,
	productsCollection
} from '../utils/firebase';

const Checkout = () => {
	const user = useLoggedInUser();
	const basket = useShoppingBasket();
	const userInfo = useUserInfo();
	const t = useTranslation();
	usePageTitle(t('checkout'));
	const { push } = useHistory();

	const [products, setProducts] = useState<Product[]>([]);
	const [deliveryAddress, setDeliveryAddress] = useState<string>('user');
	const [payment, setPayment] = useState<string>('card');
	const [city, _clearCity, cityProps] = useField('city', true);
	const [houseNumber, _clearHouseNumber, houseNumberProps] = useField(
		'houseNumber',
		true
	);
	const [street, _clearStreet, streetProps] = useField('streetNumber', true);
	const [postalCode, _clearPostalCode, postalCodeProps] = useField(
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

	const totalPrice = getTotalPrice();

	const handleAddrChange = (e: ChangeEvent) =>
		setDeliveryAddress((e.target as HTMLInputElement).value);

	const handlePaymentChange = (e: ChangeEvent) =>
		setPayment((e.target as HTMLInputElement).value);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const orderData: OrderType = {
			totalPrice,
			deliveryAddress,
			payment,
			city,
			houseNumber,
			street,
			postalCode
		};

		try {
			const docRef = await addDoc(orderCollection, orderData);
			push(`/order/${docRef.id}`);
		} catch (e) {
			console.log('error submiting order');
			console.log(e);
		}
	};

	if (!user) {
		return (
			<Alert severity="error" sx={{ width: '100%' }}>
				{t('not_logged_in')}
			</Alert>
		);
	}

	if (!basket?.length) {
		return (
			<Alert severity="info" sx={{ width: '100%' }}>
				{t('basket_empty')}
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
				<Typography variant="h4">
					{t('g_total')} {totalPrice} €
				</Typography>
			</Box>

			<Box component="div" sx={{ border: '1px solid #eaeaea', my: '2rem' }} />

			<Box component="form" onSubmit={(e: FormEvent) => handleSubmit(e)}>
				<FormControl component="fieldset">
					<FormLabel component="legend">{t('delivery_addr')}</FormLabel>
					<RadioGroup
						defaultValue="user"
						name="delivery-address"
						onChange={handleAddrChange}
					>
						<FormControlLabel
							value="user"
							control={<Radio />}
							label={t('stored_addr')}
						/>
						<FormControlLabel
							value="custom"
							control={<Radio />}
							label={t('custom_addr')}
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
						component="div"
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
					</Box>
				)}

				<Box component="div" sx={{ border: '1px solid #eaeaea', my: '2rem' }} />

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
							label={t('credit_card')}
						/>
						<FormControlLabel
							value="transfer"
							control={<Radio />}
							label={t('transfer')}
						/>
						<FormControlLabel
							value="cash"
							control={<Radio />}
							label={t('cash')}
						/>
					</RadioGroup>
				</FormControl>

				<Box component="div" sx={{ border: '1px solid #eaeaea', my: '2rem' }} />

				<Box component="div" sx={{ textAlign: 'center' }}>
					<Button type="submit" variant="contained">
						{t('confirm_order')}
					</Button>
				</Box>
			</Box>
		</>
	);
};
export default Checkout;
