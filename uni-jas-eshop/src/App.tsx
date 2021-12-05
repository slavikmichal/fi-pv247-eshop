import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

import { lightTheme } from './utils/theme';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';
import { BasketProvider } from './hooks/useShoppingBasket';
import { SnackProvider } from './hooks/useSnack';
import { LanguageProvider } from './hooks/useTranslation';

const App = () => {
	const [theme, setTheme] = useState<Theme>(lightTheme);

	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<LanguageProvider>
					<SnackProvider>
						<BasketProvider>
							<BrowserRouter>
								<CssBaseline />
								<Layout setTheme={setTheme}>
									<Routes />
								</Layout>
							</BrowserRouter>
						</BasketProvider>
					</SnackProvider>
				</LanguageProvider>
			</UserProvider>
		</ThemeProvider>
	);
};

export default App;
