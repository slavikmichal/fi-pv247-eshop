import { Grid, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

import HomeCard from '../components/HomeCard';
import { useTranslation } from '../hooks/useTranslation';

const Home: FC = () => {
	const theme = useTheme();
	const t = useTranslation();

	return (
		<>
			<Typography variant="h4" textAlign="center">
				{t('welcome')}
			</Typography>
			<Typography variant="h5" textAlign="center">
				{t('home_msg')}
			</Typography>
			<Grid container textAlign="center">
				<Grid item md={2} />
				<Grid item md={4} alignContent="center">
					<HomeCard
						router_link="/products"
						imgSrc="/resources/products.png"
						label={t('enter')}
					/>
				</Grid>
				<Grid item md={4} alignContent="center">
					<HomeCard
						router_link="/about"
						imgSrc={
							theme.palette.mode === 'light'
								? '/resources/brand_light.svg'
								: '/resources/brand_dark.svg'
						}
						label={t('about')}
					/>
				</Grid>
			</Grid>
		</>
	);
};
export default Home;
