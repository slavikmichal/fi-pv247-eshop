import { Box, Grid, Typography } from '@mui/material';

import MapComponent from '../components/MapComponent';

const About = () => (
	<Grid container sx={{ margin: 1 }}>
		<Grid item md={6}>
			<Box sx={{ width: '100%', aspectRatio: '1.5' }}>
				<Typography variant="h5">
					Address:
					<Box sx={{ marginLeft: 10 }}>
						<Typography variant="h6">Jasovská 47</Typography>
						<Typography variant="h6">Prievidza, 12345</Typography>
						<Typography variant="h6">Slovakia</Typography>
					</Box>
				</Typography>
				<Typography variant="h5">
					ICO:
					<Typography variant="h6" sx={{ marginLeft: 10 }}>
						1234567890
					</Typography>
				</Typography>
				<Typography variant="h5">
					DIC:
					<Typography variant="h6" sx={{ marginLeft: 10 }}>
						1234567890
					</Typography>
				</Typography>
				<Typography variant="h5">
					Phone nuber:
					<Typography variant="h6" sx={{ marginLeft: 10 }}>
						<a href="tel:+421345678901">+421345678901</a>
					</Typography>
				</Typography>
				<Typography variant="h5">
					E-mail:
					<Typography variant="h6" sx={{ marginLeft: 10 }}>
						<a href="mailto:mail@mail.sk">mail@mail.sk</a>
					</Typography>
				</Typography>
			</Box>
		</Grid>
		<Grid item md={6}>
			<Box sx={{ width: '100%', aspectRatio: '1.5' }}>
				<MapComponent />
			</Box>
		</Grid>
	</Grid>
);
export default About;
