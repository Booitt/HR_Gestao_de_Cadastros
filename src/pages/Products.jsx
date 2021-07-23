import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { hasEmptyField } from "../utils/utils";
import { fetchProducts, removeProduct, saveProducts } from "../utils/db";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Layout from "../components/UI/Layout";
import { Link } from "react-router-dom";
import SnackBar from "../components/SnackBar";

const InputFields = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const ButtonFields = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.5rem;

	button {
		width: 45%;
	}
`;

const BackButton = styled.div`
	display: flex;
	align-items: center;
	margin: -4rem 0 1rem 0;
	width: fit-content;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.btnBorderRadius};
	padding: 0.5rem 1rem 0.5rem 0;
	box-shadow: 0 0 8px ${({ theme }) => theme.colors.boxShadow};
	transition: background-color 400ms;

	&:hover {
		background-color: ${({ theme }) => theme.colors.secondary};

		svg {
			fill: ${({ theme }) => theme.colors.primary};
		}

		span {
			color: ${({ theme }) => theme.colors.primary};
		}
	}

	svg {
		font-size: 2.5rem;
		fill: ${({ theme }) => theme.colors.secondary};
	}

	span {
		padding-bottom: 1px;
		font-size: 1.8rem;
		color: ${({ theme }) => theme.colors.secondary};
	}
`;

const ProductsList = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.primary};
	flex: 1;
	margin-top: 1rem;
	border-radius: 0.5rem;
	font-size: 1.5rem;
	color: black;
	padding: 0 1rem;
	overflow-x: hidden;
	min-height: 75px;
	max-height: 230px;

	li {
		margin: 0.5rem 0;
		cursor: pointer;

		div {
			display: flex;
			justify-content: space-between;
			align-items: center;

			svg {
				fill: ${({ theme }) => theme.colors.red};
			}

			&:hover {
				color: ${({ theme }) => theme.colors.primary};
			}
		}
	}
`;

const ErrorMsg = styled.p`
	display: inline-block;
	text-align: center;
	margin-top: 0.5rem;
	font-size: 1.5rem;
	color: ${({ theme }) => theme.colors.red};
`;

const initialState = {
	id: "",
	nome: "",
	categoria: "",
	descricao: "",
	preco: "R$ ",
	estoque: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SETNOME":
			return { ...state, nome: action.value };
		case "SETCATEGORIA":
			return { ...state, categoria: action.value };
		case "SETDESCRICAO":
			return { ...state, descricao: action.value };
		case "SETPRECO":
			if (
				(state.preco === "R$ " && action.value === "R$") ||
				!action.value.includes("R$ ") ||
				/[^0-9,]/.test(action.value.slice(3))
			) {
				return state;
			}
			return { ...state, preco: action.value };
		case "SETESTOQUE":
			if (!isFinite(action.value.slice(-1)) || action.value.length > 4) {
				return state;
			}
			return { ...state, estoque: action.value };
		case "EDIT": {
			return action.product;
		}
		case "CLEAR": {
			return initialState;
		}
		default:
			return state;
	}
};

const Products = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [products, setProducts] = useState([]);
	const [errMsg, setErrMsg] = useState();
	const [snackBarMsg, setSnackBarMsg] = useState();

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			const products = fetchProducts();
			setProducts(products);
		}
		return () => {
			isMounted = false;
		};
	}, []);

	const handler = (e) => {
		if (errMsg) setErrMsg();
		const type = `SET${e.target.name.toUpperCase()}`;
		const value = e.target.value;
		dispatch({ type, value });
	};

	const handleSubmit = () => {
		const product = { ...state, id: state.id || uuid() };
		if (hasEmptyField(product)) {
			return setErrMsg("Há campo(s) não preenchido(s).");
		}
		saveProducts(product);
		setSnackBarMsg(`Produto ${state.id ? "editado" : "adicionado"}!`);
		setTimeout(() => {
			setSnackBarMsg();
		}, 3000);
		dispatch({ type: "CLEAR" });
		setProducts(fetchProducts());
	};

	const handleDelete = (id) => {
		removeProduct(id);
		setProducts((currProducts) =>
			currProducts.filter((product) => product.id !== id)
		);
		if (id === state.id) {
			dispatch({ type: "CLEAR" });
		}
	};

	const handleEdit = (product) => {
		dispatch({ type: "EDIT", product });
	};

	const handleCancel = () => {
		dispatch({ type: "CLEAR" });
		setErrMsg();
	};

	const isEditing = state.id !== "";

	return (
		<>
			<SnackBar show={snackBarMsg}>{snackBarMsg}</SnackBar>
			<Layout
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Link to="/">
					<BackButton>
						<IoIosArrowBack />
						<span>Home</span>
					</BackButton>
				</Link>
				<InputFields>
					<Input
						value={state.nome}
						onChange={handler}
						name="nome"
						placeholder="Cheese Bacon"
					>
						Nome
					</Input>
					<Input
						value={state.categoria}
						onChange={handler}
						placeholder="Hambúrguer"
						name="categoria"
					>
						Categoria
					</Input>
					<Input
						value={state.descricao}
						onChange={handler}
						placeholder="Queijo, bacon, maionese..."
						name="descricao"
					>
						Descrição
					</Input>
					<Input
						value={state.preco}
						onChange={handler}
						name="preco"
						width="10rem"
					>
						Preço unitário
					</Input>
					<Input
						value={state.estoque}
						onChange={handler}
						name="estoque"
						placeholder="30"
						width="5.8rem"
						marginLeft="1.5rem"
					>
						Estoque
					</Input>
				</InputFields>
				{errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
				<ButtonFields>
					<Button onClick={handleCancel} inverted>
						{!isEditing ? "Limpar" : "Cancelar"}
					</Button>
					<Button onClick={handleSubmit} inverted>
						{!isEditing ? "Adicionar" : "Salvar"}
					</Button>
				</ButtonFields>
				<ProductsList>
					<ul>
						{products.map((product) => (
							<li key={product.id}>
								<div>
									<span onClick={() => handleEdit(product)}>
										{product.nome}
									</span>
									<FaTrash onClick={() => handleDelete(product.id)} />
								</div>
							</li>
						))}
					</ul>
				</ProductsList>
			</Layout>
		</>
	);
};

export default Products;
