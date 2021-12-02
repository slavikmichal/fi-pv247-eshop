import { Button, Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { getDoc, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import NumericInput from '../components/NumericInput';
import Snack from '../components/Snack';
import useLoggedInUser from '../hooks/useLoggedInUser';
import useShoppingBasket from '../hooks/useShoppingBasket';
import { useSetSnack } from '../hooks/useSnack';
import {
	addProductToBasket,
	Product,
	productDocument,
	productsCollection,
	productsRef
} from '../utils/firebase';

const ProductPage = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [imgUrl, setImgUrl] = useState<string>('');
	const [amount, setAmount] = useState<number>(1);
	const [added, setAdded] = useState<boolean>(false);
	const user = useLoggedInUser();
	const setSnackState = useSetSnack();

	const { id } = useParams<{ id: string }>();
	// const productSnap = await getDoc<Product>(productDocument(id));
	const product = products.find(p => p.id === id);
	const theme = useTheme();
	const color = theme.palette.mode === 'light' ? 'primary' : 'secondary';

	const onAmountChange = (val: number) => setAmount(val);

	useEffect(() => {
		setSnackState({
			openInit: added,
			severity: 'success',
			text: 'Product was added to the basket',
			onClose: () => setAdded(false)
		});
	}, [added]);

	useEffect(() => {
		const unsubscribe = onSnapshot(productsCollection, snapshot => {
			setProducts(snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		const getImgUrl = async () => {
			const url: string = !product
				? '/resources/placeholder.jpg'
				: await getDownloadURL(ref(productsRef, `${product.id}.jpg`));

			setImgUrl(url);
		};
		getImgUrl();
	}, []);

	if (!product) {
		return <Box>Product does not exist.</Box>;
	}

	return (
		<Grid container>
			<Grid item md={7}>
				<img
					id="product_img"
					// src={`/resources/products/${product.id}.jpg`}
					src={imgUrl}
					alt={product['name-en']}
					style={{ objectFit: 'contain', width: '95%' }}
				/>
			</Grid>
			<Grid item md={5}>
				<Typography variant="h3" sx={{ marginBottom: 4 }}>
					{product['name-en']}
				</Typography>
				<Typography variant="h4">{product['price-vat']} €</Typography>
				<Grid container sx={{ marginY: 1 }}>
					<Grid item>
						<NumericInput onChange={onAmountChange} />
					</Grid>
					<Grid item md={9} sx={{ marginLeft: 2 }}>
						<Button
							color={color}
							variant="contained"
							sx={{ width: 200 }}
							onClick={async () => {
								try {
									await addProductToBasket(user?.uid ?? '', product.id, amount);
									setAdded(true);
								} catch {
									console.log('Error while adding product to the basket');
								}
							}}
						>
							Add to basket
						</Button>
					</Grid>
				</Grid>
				{/* <Typography variant="body1">{product.description}</Typography> */}
			</Grid>
		</Grid>
	);
};

export default ProductPage;
