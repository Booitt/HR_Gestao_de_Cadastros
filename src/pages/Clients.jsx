import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { hasEmptyField } from "../utils/utils";
import { fetchClients, removeClient, saveClients } from "../utils/db";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Layout from "../components/UI/Layout";
import SnackBar from "../components/SnackBar";

const InputFields = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const ButtonFields = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.5rem;

	button {
		width: 45%;
	}
`;

const ClientsList = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.primary};
	flex: 1;
	margin-top: 1rem;
	border-radius: 0.5rem;
	font-size: 1.5rem;
	color: ${({ theme }) => theme.colors.neutral};
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

const BackButton = styled.div`
	display: flex;
	align-items: center;
	margin: -4rem 0 1rem 0;
	width: fit-content;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.btnBorderRadius};
	padding: 0.5rem 1rem 0.5rem 0;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
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

const initialState = {
	id: "",
	nome: "",
	CPF: "",
	endereco: "",
	cidade: "",
	UF: "",
	bairro: "",
	CEP: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SETNOME":
			return { ...state, nome: action.value };
		case "SETCPF":
			return { ...state, CPF: action.value };
		case "SETENDERECO":
			return { ...state, endereco: action.value };
		case "SETCIDADE":
			return { ...state, cidade: action.value };
		case "SETUF":
			if (action.value.length > 2) {
				return { ...state, UF: action.value.slice(0, 2) };
			}
			return { ...state, UF: action.value };
		case "SETBAIRRO":
			return { ...state, bairro: action.value };
		case "SETCEP":
			return { ...state, CEP: action.value };
		case "EDIT": {
			return action.client;
		}
		case "CLEAR": {
			return initialState;
		}
		default:
			return state;
	}
};

const Clients = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [clients, setClients] = useState([]);
	const [errMsg, setErrMsg] = useState();
	const [snackBarMsg, setSnackBarMsg] = useState();

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			const clients = fetchClients();
			setClients(clients);
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
		const client = { ...state, id: state.id || uuid() };
		if (hasEmptyField(client)) {
			return setErrMsg("Há campo(s) não preenchido(s).");
		}
		saveClients(client);
		setSnackBarMsg(`Cliente ${state.id ? "editado" : "adicionado"}!`);
		setTimeout(() => {
			setSnackBarMsg();
		}, 3000);
		dispatch({ type: "CLEAR" });
		setClients(fetchClients());
	};

	const handleDelete = (id) => {
		removeClient(id);
		setClients((currClients) =>
			currClients.filter((client) => client.id !== id)
		);
		if (id === state.id) {
			dispatch({ type: "CLEAR" });
		}
	};

	const handleEdit = (client) => {
		dispatch({ type: "EDIT", client });
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
						name="Nome"
						placeholder="Carlos da Silva Rodrigues"
					>
						Nome completo
					</Input>
					<Input
						value={state.CPF}
						onChange={handler}
						type="CPF"
						name="CPF"
						placeholder="000.000.000-00"
						width="13rem"
					>
						CPF
					</Input>
				</InputFields>
				<InputFields>
					<Input
						value={state.endereco}
						onChange={handler}
						name="endereco"
						placeholder="Av. Paulista, 1610"
					>
						Endereço
					</Input>
					<Input
						value={state.cidade}
						onChange={handler}
						name="cidade"
						placeholder="São Paulo"
						width="86%"
					>
						Cidade
					</Input>
					<Input
						value={state.UF}
						onChange={handler}
						name="UF"
						placeholder="SP"
						width="4rem"
					>
						UF
					</Input>
					<Input
						value={state.bairro}
						onChange={handler}
						name="bairro"
						placeholder="Centro"
						width="70.5%"
					>
						Bairro
					</Input>
					<Input
						value={state.CEP}
						onChange={handler}
						name="CEP"
						type="CEP"
						placeholder="00.000-00"
						width="9.5rem"
					>
						CEP
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
				<ClientsList>
					<ul>
						{clients.map((client) => (
							<li key={client.id}>
								<div>
									<span onClick={() => handleEdit(client)}>
										{client.nome}
									</span>
									<FaTrash onClick={() => handleDelete(client.id)} />
								</div>
							</li>
						))}
					</ul>
				</ClientsList>
			</Layout>
		</>
	);
};

export default Clients;
