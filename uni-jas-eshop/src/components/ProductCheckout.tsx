import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { FC } from 'react';

import useImage from '../hooks/useImage';
import useProductInfo from '../hooks/useProductInfo';
import { useTranslation } from '../hooks/useTranslation';
import { BasketProduct, Product } from '../utils/firebase';

type Props = {
	bProduct: BasketProduct;
};

const ProductCheckout: FC<Props> = ({ bProduct }) => {
	const product = useProductInfo(bProduct.product_id);
	const imgUrl = useImage(bProduct.product_id);
	const t = useTranslation();

	return (
		<Paper sx={{ paddingX: 4, paddingY: 1 }}>
			<Grid container>
				<Grid item md={3}>
					<img
						id="product_img"
						src={imgUrl}
						alt={product?.['name-en']}
						style={{ objectFit: 'contain', width: '50%' }}
					/>
				</Grid>
				<Grid
					item
					md={6}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Typography fontSize={20}>{product?.['name-en']}</Typography>
				</Grid>
				<Grid
					item
					md={3}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Typography fontSize={20}>
						{t('amount')}
						{bProduct.amount}, {t('total')}
						{bProduct.amount * (product?.['price-vat'] ?? 0)} €
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};
export default ProductCheckout;
