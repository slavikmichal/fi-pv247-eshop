import { Grid } from '@mui/material';

import ProductCard from '../components/ProductCard';
import { Product } from '../utils/firebase';

const products: Product[] = [
	{
		id: 1,
		name: 'Audi',
		price: 100,
		description: 'German car.',
		image: 'audi.jpg'
	},
	{
		id: 2,
		name: 'BMW',
		price: 80,
		description: 'Another german car.',
		image: 'bmw.jpeg'
	},
	{
		id: 3,
		name: 'Mercedes-Benz',
		price: 120,
		description: 'Yet another german car.',
		image: 'mercedes.jpg'
	},
	{
		id: 4,
		name: 'Porsche',
		price: 180,
		description: 'German machine.',
		image: 'porsche.jpg'
	},
	{
		id: 5,
		name: 'Nissan',
		price: 200,
		description: 'Sutututututu.',
		image: 'nissan.jpg'
	}
];

const Products = () => (
	<Grid container>
		{products.map((p, i) => (
			<ProductCard key={i} product={p} />
		))}
	</Grid>
);
export default Products;
