import Main from "./styled";

const formatPrice = (price) => {
	if(!price.includes(",")) price += ",00"
	if(!/.,\d\d/.test(price)) {
		const splited = price.split(",")
		splited[1] = splited[1].padEnd(2, "0")
		price = splited.join(",")
	}
	return price
}

const ListProducts = ({ products }) => {
	return (
		<Main>
			{products.length ? (
				products.map(({ id, nome, descricao, preco }) => (
					<li key={id}>
						<strong>{nome}</strong> ‧ {descricao} ‧ {formatPrice(preco)}
					</li>
				))
			) : (
				<p>Nenhum produto cadastrado</p>
			)}
		</Main>
	);
};

export default ListProducts;
