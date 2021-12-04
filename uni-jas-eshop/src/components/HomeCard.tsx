import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
	imgSrc: string;
	label: string;
	router_link: string;
};

const HomeCard: FC<Props> = ({ imgSrc, label, router_link }) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<Card
			sx={{ maxWidth: 345 }}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<Box
				component={Link}
				to={router_link}
				style={{
					textDecoration: 'None'
				}}
			>
				<Box component="div" sx={{ overflow: 'hidden' }}>
					<CardMedia
						component="img"
						height="250"
						src={imgSrc}
						style={{
							objectFit: 'contain',
							transform: isHovering ? `scale3d(1.3, 1.3, 1)` : '',
							transition: 'transform 0.2s ease-in-out'
						}}
					/>
				</Box>
				<CardContent sx={{ height: 80 }}>
					<Typography variant="h5" component="div" textAlign="center">
						{label}
					</Typography>
				</CardContent>
			</Box>
		</Card>
	);
};

export default HomeCard;
