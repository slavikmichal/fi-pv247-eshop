import { Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../utils/firebase';
import useImage from '../hooks/useImage';
import { useLanguage } from '../hooks/useTranslation';

const SearchProduct: FC<{ product: Product; onClick: () => void }> = ({
	product,
	onClick
}) => {
	const imgUrl = useImage(product.id);
	const [lang] = useLanguage();

	return (
		<Button
			component={Link}
			to={`/products/${product.id}`}
			sx={{ paddingX: 4, paddingY: 1 }}
			onClick={onClick}
			className="SearchItem"
		>
			<Grid container>
				<Grid item md={2}>
					<img
						id="product_img"
						src={imgUrl}
						alt={lang === 'en' ? product?.['name-en'] : product?.['name-sk']}
						style={{ objectFit: 'contain', width: '95%' }}
					/>
				</Grid>
				<Grid item sx={{ ml: 3, mt: 2 }}>
					<Typography>
						{lang === 'en' ? product?.['name-en'] : product?.['name-sk']}
					</Typography>
				</Grid>
			</Grid>
		</Button>
	);
};

export default SearchProduct;
