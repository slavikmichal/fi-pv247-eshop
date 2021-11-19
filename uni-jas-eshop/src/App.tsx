import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import theme from './utils/theme';
import Layout from './components/Layout';
import Routes from './components/Routes';

const App = () => (
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<CssBaseline />
			<Layout>
				<Routes />
			</Layout>
		</BrowserRouter>
	</ThemeProvider>
);

export default App;
