import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../utils/firebase';
import useImage from '../hooks/useImage';

const SearchProduct: FC<{ product: Product }> = ({ product }) => {
	const imgUrl = useImage(product.id);

	return (
		<Button
			component={Link}
			to={`/products/${product.id}`}
			sx={{ paddingX: 4, paddingY: 1 }}
		>
			<Grid container>
				<Grid item md={2}>
					<img
						id="product_img"
						src={imgUrl}
						alt={product?.['name-en']}
						style={{ objectFit: 'contain', width: '95%' }}
					/>
				</Grid>
				<Grid item sx={{ ml: 3, mt: 2 }}>
					<Typography>{product['name-en']}</Typography>
				</Grid>
			</Grid>
		</Button>
	);
};

export default SearchProduct;
