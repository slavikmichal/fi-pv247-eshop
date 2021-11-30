import { SdCardAlert } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	useTheme,
	Zoom
} from '@mui/material';
import { flexbox } from '@mui/system';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../utils/firebase';

type Props = {
	product: Product;
};

const ProductCard: FC<Props> = ({ product, children }) => {
	const [isHovering, setIsHovering] = useState(false);
	const theme = useTheme();
	const color = theme.palette.mode === 'light' ? 'primary' : 'secondary';

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
							image={`/resources/products/${product.id}.jpg`}
							style={{
								objectFit: 'contain',
								transform: isHovering ? `scale3d(1.3, 1.3, 1)` : '',
								transition: 'transform 0.2s ease-in-out'
							}}
						/>
					</Box>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{product['name-en']}
						</Typography>
						{/* <Typography variant="body2" color="text.secondary">
							{product?.description}
						</Typography> */}
					</CardContent>
					<CardActions>
						<Button color={color} size="small">
							Share
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						<Button color={color} size="small">
							Learn More
						</Button>
					</CardActions>
				</Box>
			</Card>
		</Grid>
	);
};
export default ProductCard;
