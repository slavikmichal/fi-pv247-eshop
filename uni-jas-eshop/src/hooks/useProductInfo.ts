import { useEffect, useState } from 'react';

import { getProduct, Product } from '../utils/firebase';

const useProductInfo = (id: string) => {
	const [product, setProduct] = useState<Product>();

	useEffect(() => {
		const getProd = async () => {
			const p = await getProduct(id);
			setProduct(p);
		};
		getProd();
	}, [id]);

	return product;
};

export default useProductInfo;
