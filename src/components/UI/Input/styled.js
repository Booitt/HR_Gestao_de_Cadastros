import styled from "styled-components";

const InputWrapper = styled.div`
    margin: .5rem 0;
	margin-left: ${({marginLeft}) => marginLeft || 0};
	width: ${({ width }) => width || "100%"};
	color: ${({ theme }) => theme.colors.primary};
`;

InputWrapper.Label = styled.label`
	font-size: ${({ labelFontSize }) => labelFontSize || "1.4rem"};
	margin: 0 0 0.3rem 0.3rem;
	display: block;
`;

InputWrapper.Input = styled.input`
    width: 100%;
	font-size: ${({ inputFontSize }) => inputFontSize || "1.5rem"};
	border: 1px solid ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.inputBorderRadius};
	padding: 0.8rem;

	&::placeholder {
		color: ${({theme}) => theme.colors.placeholder};
	}
`;

export default InputWrapper;
