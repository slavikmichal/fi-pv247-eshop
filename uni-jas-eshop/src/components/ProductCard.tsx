import { getDownloadURL } from '@firebase/storage';
import { SdCardAlert } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	useTheme
} from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import useImage from '../hooks/useImage';
import { useLanguage } from '../hooks/useTranslation';
import { Product } from '../utils/firebase';

type Props = {
	product: Product;
};

const ProductCard: FC<Props> = ({ product }) => {
	const [isHovering, setIsHovering] = useState(false);
	const [lang, _setLang] = useLanguage();
	const imgUrl = useImage(product.id);
	const theme = useTheme();

	return (
		<Grid item md={4} sx={{ marginTop: 2 }}>
			<Card
				sx={{ maxWidth: 345 }}
				onMouseEnter={() => {
					setIsHovering(true);
				}}
				onMouseLeave={() => {
					setIsHovering(false);
				}}
			>
				<Box
					component={Link}
					to={`/products/${product.id}`}
					style={{ textDecoration: 'None', color: theme.palette.text.primary }}
				>
					<Box component="div" sx={{ overflow: 'hidden' }}>
						<CardMedia
							component="img"
							alt={product['name-en'] ?? 'No image found'}
							height="250"
							src={imgUrl}
							style={{
								objectFit: 'contain',
								transform: isHovering ? `scale3d(1.3, 1.3, 1)` : '',
								transition: 'transform 0.2s ease-in-out'
							}}
						/>
					</Box>
					<CardContent sx={{ height: 100 }}>
						<Typography gutterBottom variant="h5" component="div">
							{lang === 'en' ? product['name-en'] : product['name-sk']}
						</Typography>
					</CardContent>
				</Box>
			</Card>
		</Grid>
	);
};
export default ProductCard;
