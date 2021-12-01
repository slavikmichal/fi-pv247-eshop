import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import theme from './utils/theme';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';
import { BasketProvider } from './hooks/useShoppingBasket';

const App = () => (
	<ThemeProvider theme={theme}>
		<UserProvider>
			<BasketProvider>
				<BrowserRouter>
					<CssBaseline />
					<Layout>
						<Routes />
					</Layout>
				</BrowserRouter>
			</BasketProvider>
		</UserProvider>
	</ThemeProvider>
);

export default App;
