import { Grid } from '@mui/material';

import ProductCard from '../components/ProductCard';
import { Product, products } from '../utils/firebase';

const Products = () => (
	<Grid container>
		{products.map((p, i) => (
			<ProductCard key={i} product={p} />
		))}
	</Grid>
);
export default Products;
