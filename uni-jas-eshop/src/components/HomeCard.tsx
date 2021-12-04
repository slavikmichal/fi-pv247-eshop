import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	useTheme
} from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
	imgSrc: string;
	label: string;
	router_link: string;
};

const HomeCard: FC<Props> = ({ imgSrc, label, router_link }) => {
	const [isHovering, setIsHovering] = useState(false);
	const theme = useTheme();

	return (
		<Card
			sx={{ maxWidth: 345, margin: 1 }}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<Box
				component={Link}
				to={router_link}
				sx={{
					textDecoration: 'None',
					color: theme.palette.text.primary
				}}
			>
				<Box component="div" sx={{ overflow: 'hidden' }}>
					<CardMedia
						component="img"
						height="250"
						src={imgSrc}
						sx={{
							objectFit: 'contain',
							transform: isHovering ? `scale3d(1.3, 1.3, 1)` : '',
							transition: 'transform 0.2s ease-in-out'
						}}
					/>
				</Box>
				<CardContent sx={{ height: 60 }}>
					<Typography variant="h5" textAlign="center">
						{label}
					</Typography>
				</CardContent>
			</Box>
		</Card>
	);
};

export default HomeCard;
