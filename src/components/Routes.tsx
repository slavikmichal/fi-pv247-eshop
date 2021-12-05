import { Switch, Route } from 'react-router-dom';

import About from '../pages/About';
import Home from '../pages/Home';
import Products from '../pages/Products';
import NotFound from '../pages/NotFound';
import ProductPage from '../pages/ProductPage';
import Checkout from '../pages/Checkout';
import Order from '../pages/Order';

const Routes = () => (
	<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/about" exact component={About} />
		<Route path="/products" exact component={Products} />
		<Route path="/products/:id" exact component={ProductPage} />
		<Route path="/checkout" exact component={Checkout} />
		<Route path="/order/:id" exact component={Order} />
		<Route component={NotFound} />
	</Switch>
);
export default Routes;
