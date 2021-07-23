import Main from "./styled";

const maskCPF = (cpf) => "***.***.**" + cpf.slice(10);

const ListClients = ({ clients }) => {
	return (
		<Main>
			{clients.length ? (
				clients.map(({ id, nome, CPF, endereco, cidade, UF, CEP }) => (
					<li key={id}>
						<strong>{nome}</strong> ‧ {maskCPF(CPF)} ‧ {endereco} -{" "}
						{cidade}/{UF} ({CEP})
					</li>
				))
			) : (
				<p>Nenhum cliente cadastrado</p>
			)}
		</Main>
	);
};

export default ListClients;
