import { onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';

import { Product, productsCollection } from '../utils/firebase';

const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const unsubscribe = onSnapshot(productsCollection, snapshot => {
			setProducts(snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return products;
};

export default useProducts;
