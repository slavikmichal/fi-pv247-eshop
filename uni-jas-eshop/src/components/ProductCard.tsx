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
	Zoom
} from '@mui/material';
import { flexbox } from '@mui/system';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../utils/firebase';
import theme from '../utils/theme';

type Props = {
	product: Product;
};

const ProductCard: FC<Props> = ({ product, children }) => {
	const [isHovering, setIsHovering] = useState(false);

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
							alt={product.name ?? 'No image found'}
							height="250"
							image={
								product.image
									? `/resources/${product.image}`
									: '/resources/placeholder.png'
							}
							style={{
								objectFit: 'contain',
								transform: isHovering ? `scale3d(1.3, 1.3, 1)` : '',
								transition: 'transform 0.2s ease-in-out'
							}}
						/>
					</Box>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{product.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{product.description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Share</Button>
						<Box sx={{ flexGrow: 1 }} />
						<Button size="small">Learn More</Button>
					</CardActions>
				</Box>
			</Card>
		</Grid>
	);
};
export default ProductCard;
