import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Products from "./pages/Products";

const Routes = () => {
	return (
		<BrowserRouter>
			<Route component={Home} exact path="/" />
			<Route component={Clients} path="/clientes" />
			<Route component={Products} path="/produtos" />
		</BrowserRouter>
	);
};

export default Routes;
