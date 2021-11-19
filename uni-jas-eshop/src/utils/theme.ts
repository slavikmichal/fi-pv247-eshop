import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		//add light and dark options according to uni-jas colors
		primary: { main: '#65a5d1' },
		secondary: { main: '#000000' },
		mode: 'light'
	}
});

export default theme;
