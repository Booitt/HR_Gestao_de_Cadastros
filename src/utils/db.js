export const fetchClients = () =>
	JSON.parse(localStorage.getItem("clientes")) || [];
export const saveClients = (newClient) => {
	const currentClients = fetchClients();

	if (currentClients.length) {
		const filteredClients = currentClients.filter(
			(client) => client.id !== newClient.id
		);

		if (filteredClients.length !== currentClients.length) {
			return localStorage.setItem(
				"clientes",
				JSON.stringify([newClient, ...filteredClients])
			);
		}

		localStorage.setItem(
			"clientes",
			JSON.stringify([newClient, ...currentClients])
		);
	} else {
		localStorage.setItem("clientes", JSON.stringify([newClient]));
	}
};
export const removeClient = (id) => {
	const currentClients = fetchClients();
	const filteredClients = currentClients.filter((client) => client.id !== id);
	localStorage.setItem("clientes", JSON.stringify(filteredClients));
};

export const fetchProducts = () =>
	JSON.parse(localStorage.getItem("produtos")) || [];
export const saveProducts = (newProduct) => {
	const currentProducts = fetchProducts();

	if (currentProducts.length) {
		const filteredProducts = currentProducts.filter(
			(product) => product.id !== newProduct.id
		);

		if (filteredProducts.length !== currentProducts.length) {
			return localStorage.setItem(
				"produtos",
				JSON.stringify([newProduct, ...filteredProducts])
			);
		}

		localStorage.setItem(
			"produtos",
			JSON.stringify([newProduct, ...currentProducts])
		);
	} else {
		localStorage.setItem("produtos", JSON.stringify([newProduct]));
	}
};
export const removeProduct = (id) => {
	const currentProducts = fetchProducts();
	const filteredProducts = currentProducts.filter(
		(product) => product.id !== id
	);
	localStorage.setItem("produtos", JSON.stringify(filteredProducts));
};
