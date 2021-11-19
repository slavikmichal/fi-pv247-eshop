import { Switch, Route } from 'react-router-dom';

import About from '../pages/About';
import Home from '../pages/Home';
import Products from '../pages/Products';
import NotFound from '../pages/NotFound';

const Routes = () => (
	<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/about" exact component={About} />
		<Route path="/products" exact component={Products} />
		<Route component={NotFound} />
	</Switch>
);
export default Routes;
