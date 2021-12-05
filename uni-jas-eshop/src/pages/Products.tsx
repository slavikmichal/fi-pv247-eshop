import { Grid } from '@mui/material';
import { FC } from 'react';

import ProductCard from '../components/ProductCard';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import useProducts from '../hooks/useProducts';

const Products: FC = () => {
	const products = useProducts();
	const t = useTranslation();
	usePageTitle(t('products'));

	return (
		<Grid container>
			{products.map((p, i) => (
				<ProductCard key={i} product={p} />
			))}
		</Grid>
	);
};
export default Products;
