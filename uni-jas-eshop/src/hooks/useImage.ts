import { getDoc } from '@firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { Product, productDocument, productsRef } from '../utils/firebase';

const useImage = (id: string) => {
	const [imgUrl, setImgUrl] = useState<string>('');

	useEffect(() => {
		const getImgUrl = async () => {
			const productSnap = await getDoc<Product>(productDocument(id));
			const url: string = await getDownloadURL(
				ref(productsRef, `${productSnap.get('id')}.jpg`)
			);
			setImgUrl(url);
		};
		getImgUrl();
	}, [id]);

	return imgUrl;
};

export default useImage;
