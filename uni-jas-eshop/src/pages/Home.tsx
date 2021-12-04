import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

import HomeCard from '../components/HomeCard';

const Home: FC = () => (
	<>
		<Typography variant="h4" textAlign="center">
			Welcome on our website!
		</Typography>
		<Typography variant="h5" textAlign="center">
			Uni-Jas is a place, where you can shop all the necessities for your
			restaurant, pub or home.
		</Typography>
		<Grid container textAlign="center">
			<Grid item md={2} />
			<Grid item md={4} alignContent="center">
				<HomeCard
					router_link="/products"
					imgSrc="/resources/brand_dark.svg"
					label="Enter eshop"
				/>
			</Grid>
			<Grid item md={4} alignContent="center">
				<HomeCard
					router_link="/about"
					imgSrc="/resources/brand_light.svg"
					label="About Us"
				/>
			</Grid>
		</Grid>
	</>
);
export default Home;
