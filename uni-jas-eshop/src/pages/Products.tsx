import { onSnapshot } from '@firebase/firestore';
import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import ProductCard from '../components/ProductCard';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import { Product, productsCollection } from '../utils/firebase';

const Products: FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const t = useTranslation();
	usePageTitle(t('products'));

	useEffect(() => {
		const unsubscribe = onSnapshot(productsCollection, snapshot => {
			setProducts(snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Grid container>
			{products.map((p, i) => (
				<ProductCard key={i} product={p} />
			))}
		</Grid>
	);
};
export default Products;
