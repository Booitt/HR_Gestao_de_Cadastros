import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchClients, fetchProducts } from "../utils/db.js";
import Button from "../components/UI/Button";
import Layout from "../components/UI/Layout";
import styled from "styled-components";
import ListClients from "../components/ListClients/index.jsx";
import ListProducts from "../components/ListProducts/index.jsx";

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${({ theme }) => theme.colors.contrastText};
	border-bottom: 1px solid ${({ theme }) => theme.colors.button};

	h1 {
		font-size: 3rem;
	}
	p {
		font-size: 1.5rem;
	}
`;

const Home = () => {
	const [clients, setClients] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setClients(
			fetchClients().sort((a, b) =>
				a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0
			)
		);
		setProducts(fetchProducts());
	}, []);

	return (
		<Layout
			width="70rem"
			noMaxHeight
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Header>
				<h1>Clientes</h1>
				<Button fontSize="1.5rem" inverted linkNested>
					<Link to="/clientes">Gerenciar</Link>
				</Button>
			</Header>
			<ListClients clients={clients} />
			<Header>
				<h1>Produtos</h1>
				<Button fontSize="1.5rem" inverted linkNested>
					<Link to="/produtos">Gerenciar</Link>
				</Button>
			</Header>
			<ListProducts products={products} />
		</Layout>
	);
};

export default Home;
