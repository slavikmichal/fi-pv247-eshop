import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router';

import NumericInput from '../components/NumericInput';
import { products } from '../utils/firebase';

const ProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const product = products.find(p => p.id === +id);

	if (!product) {
		return <Box>Product does not exist.</Box>;
	}

	return (
		<Grid container>
			<Grid item md={7}>
				<img
					src={`/resources/${product.image}`}
					alt={product.name}
					style={{ objectFit: 'contain', width: '95%' }}
				/>
			</Grid>
			<Grid item md={5}>
				<Typography variant="h3" sx={{ marginBottom: 4 }}>
					{product.name}
				</Typography>
				<Typography variant="h4">{product.price} €</Typography>
				<Grid container sx={{ marginY: 1 }}>
					<Grid item>
						<NumericInput />
					</Grid>
					<Grid item md={9} sx={{ marginLeft: 2 }}>
						<Button variant="contained" sx={{ width: 200 }}>
							Add to basket
						</Button>
					</Grid>
				</Grid>
				<Typography variant="body1">{product.description}</Typography>
			</Grid>
		</Grid>
	);
};

export default ProductPage;
