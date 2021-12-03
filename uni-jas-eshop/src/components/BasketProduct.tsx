import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	getProduct,
	Product,
	removeProductFromBasket
} from '../utils/firebase';
import { useSetSnack } from '../hooks/useSnack';

import NumericInput from './NumericInput';

type Props = {
	productId: string;
	amount: number;
	onRemoved: () => void;
	onIncr?: () => void;
	onDecr?: () => void;
};

const BasketProduct: FC<Props> = ({
	productId,
	amount,
	onRemoved,
	onIncr,
	onDecr
}) => {
	const [product, setProduct] = useState<Product>();
	const user = useLoggedInUser();

	useEffect(() => {
		const getProd = async () => {
			const p = await getProduct(productId);
			setProduct(p);
		};
		getProd();
	}, []);

	const removeProduct = () => {
		if (!user || !product) {
			return;
		}
		removeProductFromBasket(user.uid, product.id);
		onRemoved();
	};

	return (
		<Paper sx={{ width: 600, paddingX: 4, paddingY: 1 }}>
			<Typography>{product?.['name-en']}</Typography>
			<Grid container>
				<Grid item md={3}>
					<img
						id="product_img"
						src={`/resources/products/${product?.id}.jpg`}
						alt={product?.['name-en']}
						style={{ objectFit: 'contain', width: '95%' }}
					/>
				</Grid>
				<Grid
					item
					md={7}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<NumericInput initVal={amount} onIncr={onIncr} onDecr={onDecr} />
				</Grid>
				<Grid
					item
					md={2}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<IconButton onClick={removeProduct}>
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
};
export default BasketProduct;
