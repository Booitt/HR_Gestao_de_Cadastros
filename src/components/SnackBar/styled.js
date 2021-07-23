import styled from "styled-components";

const SnackBar = styled.div`
    display: ${({show}) => show ? "initial" : "none"};
	position: absolute;
	top: 1rem;
	left: 0;
	width: 100%;
    background-color: transparent;
`;

SnackBar.Message = styled.div`
    position: relative;
    margin: auto;
    height: fit-content;
    width: fit-content;
    padding: 1rem 5rem;
    border-radius: ${({theme}) => theme.btnBorderRadius};
    background-color: ${({theme}) => theme.colors.green};
    color: ${({theme}) => theme.colors.secondary};
    box-shadow: 0 0 10px ${({theme}) => theme.colors.boxShadow};

    p {
        font-size: 1.5rem;
    }
`;

export default SnackBar;