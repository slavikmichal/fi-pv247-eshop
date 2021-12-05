import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import NumericInput from '../components/NumericInput';
import useImage from '../hooks/useImage';
import useLoggedInUser from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';
import { useSetSnack } from '../hooks/useSnack';
import { useLanguage, useTranslation } from '../hooks/useTranslation';
import {
	addProductToBasket,
	Product,
	productsCollection
} from '../utils/firebase';

const ProductPage = () => {
	const { id } = useParams<{ id: string }>();

	const [products, setProducts] = useState<Product[]>([]);
	const [amount, setAmount] = useState<number>(1);
	const [added, setAdded] = useState<boolean>(false);
	const [lang, _setLang] = useLanguage();

	const user = useLoggedInUser();
	const setSnackState = useSetSnack();
	const imgUrl = useImage(id);
	const t = useTranslation();
	usePageTitle(t('product'));

	const product = products.find(p => p.id === id);

	const onAmountChange = (val: number) => setAmount(val);

	useEffect(() => {
		setSnackState({
			openInit: added,
			severity: 'success',
			text: t('product_added'),
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

	if (!product) {
		return <Box>{t('product_not_exist')}</Box>;
	}

	return (
		<Grid container>
			<Grid item md={7}>
				<img
					src={imgUrl}
					alt={product['name-en']}
					style={{ objectFit: 'contain', width: '95%' }}
				/>
			</Grid>
			<Grid item md={5}>
				<Typography variant="h3" sx={{ marginBottom: 4 }}>
					{lang === 'en' ? product['name-en'] : product['name-sk']}
				</Typography>
				{user ? (
					<>
						<Typography variant="h4">{product['price-vat']} €</Typography>
						<Grid container sx={{ marginY: 1 }}>
							<Grid item>
								<NumericInput onChange={onAmountChange} />
							</Grid>

							<Grid item md={9} sx={{ marginLeft: 2 }}>
								<Button
									variant="contained"
									sx={{ width: 200 }}
									onClick={async () => {
										try {
											await addProductToBasket(
												user?.uid ?? '',
												product.id,
												amount
											);
											setAdded(true);
										} catch {
											console.log('Error while adding product to the basket');
										}
									}}
								>
									{t('add')}
								</Button>
							</Grid>
						</Grid>
					</>
				) : (
					<Typography>{t('prices_info')}</Typography>
				)}
			</Grid>
		</Grid>
	);
};

export default ProductPage;
