import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: { main: '#1100B2', contrastText: '#ffffff' },
		secondary: { main: '#89D0CA', contrastText: '#000000' },
		mode: 'light'
	}
});

export default theme;
