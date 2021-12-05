import { getDoc } from '@firebase/firestore';
import { Alert, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import useUserInfo from '../hooks/useUserInfo';
import { OrderType, orderDocument } from '../utils/firebase';

const Order = () => {
	const { id } = useParams<{ id: string }>();
	const [orderData, setOrderData] = useState<OrderType>();
	const userInfo = useUserInfo();

	useEffect(() => {
		const getOrderData = async () => {
			try {
				const docRef = await getDoc(orderDocument(id));
				setOrderData(docRef.data());
			} catch {
				console.log('error while retrieving order data');
			}
		};
		getOrderData();
	}, []);

	if (!orderData || !userInfo) {
		return <Alert severity="warning">Order not found!</Alert>;
	}

	return (
		<Box component="div">
			<Alert severity="success">Order succesfully submited!</Alert>
			<Typography variant="h6">Total price:</Typography>
			<Typography sx={{ fontSize: '25px' }}>
				{orderData.totalPrice} €
			</Typography>
			<Typography variant="h6">Delivery address:</Typography>
			{orderData.deliveryAddress === 'user' ? (
				<>
					<Typography
						component="div"
						sx={{ fontSize: '25px' }}
					>{`${userInfo?.street} ${userInfo?.houseNumber}`}</Typography>
					<Typography
						component="div"
						sx={{ fontSize: '25px' }}
					>{`${userInfo?.postalCode} ${userInfo?.city}`}</Typography>
				</>
			) : (
				<>
					<Typography
						component="div"
						sx={{ fontSize: '25px' }}
					>{`${orderData?.street} ${orderData?.houseNumber}`}</Typography>
					<Typography
						component="div"
						sx={{ fontSize: '25px' }}
					>{`${orderData?.postalCode} ${orderData?.city}`}</Typography>
				</>
			)}
			<Typography variant="h6">Payment type:</Typography>
			{orderData.payment === 'card' ? (
				<Typography sx={{ fontSize: '25px' }}>Credit card</Typography>
			) : orderData.payment === 'transfer' ? (
				<Typography sx={{ fontSize: '25px' }}>Bank tranfer</Typography>
			) : (
				<Typography sx={{ fontSize: '25px' }}>Cash on delivery</Typography>
			)}
		</Box>
	);
};
export default Order;
