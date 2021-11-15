import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		//add light and dark options according to uni-jas colors
		primary: { main: '#f2d45c' },
		mode: 'light'
	}
});

export default theme;
