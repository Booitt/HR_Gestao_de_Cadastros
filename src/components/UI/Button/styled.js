import styled from "styled-components";

const Button = styled.button`
	color: ${({ theme, inverted }) =>
		!inverted ? theme.colors.primary : theme.colors.secondary};
	background-color: ${({ theme, inverted }) =>
		!inverted ? theme.colors.secondary : theme.colors.primary};
	font-size: ${({ fontSize }) => fontSize || "1.5rem"};
	border: 1px solid ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.btnBorderRadius};
	padding: ${({ linkNested }) => (linkNested ? "1rem 0" : "1rem")};
	margin: ${({ margin }) => margin || ".5rem 0"};
	transition: all 300ms;

	&:hover {
		color: ${({ theme, inverted }) =>
			!inverted ? theme.colors.secondary : theme.colors.primary};
		background-color: ${({ theme, inverted }) =>
			!inverted ? theme.colors.primary : theme.colors.secondary};
	}

	a {
		padding: 1.2rem;
	}
`;

export default Button;
