import { ThemeProvider } from '@mui/material';

import logo from './logo.svg';
import './App.css';
import theme from './utils/theme';

const App = () => (
	<ThemeProvider theme={theme}>
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>This app is running.</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	</ThemeProvider>
);

export default App;
