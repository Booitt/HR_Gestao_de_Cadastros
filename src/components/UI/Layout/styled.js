import styled from "styled-components";

const Layout = styled.div`
	min-height: 80vh;
	height: fit-content;
	width: 100%;
	margin: 3.5rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

Layout.Content = styled.div`
	background-color: ${({ theme }) => theme.colors.secondary};
	height: ${({noMaxHeight}) => noMaxHeight ? "fit-content" : "80%"};
	max-height: ${({noMaxHeight}) => noMaxHeight || "645px"};
	width: ${({width}) => width || "400px"};
	margin: 1rem;
	padding: 2rem;
	border-radius: ${({ theme }) => theme.borderRadius};
	box-shadow: 0 0 3em rgba(0, 0, 0, 0.5);

	@media(min-height: 650px) {
		height: fit-content;
		max-height: initial;
	}
`;

export default Layout;
