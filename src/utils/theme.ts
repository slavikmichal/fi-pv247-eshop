import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
	palette: {
		primary: { main: '#1100B2', contrastText: '#ffffff' },
		mode: 'light'
	}
});

export const darkTheme = createTheme({
	palette: {
		primary: { main: '#89D0CA', contrastText: '#000000' },
		mode: 'dark'
	}
});
