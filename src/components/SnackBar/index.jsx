import StyledSnackBar from "./styled";

const SnackBar = ({children, show}) => {
	return (
		<StyledSnackBar show={show}>
			<StyledSnackBar.Message>
				<p>{children}</p>
			</StyledSnackBar.Message>
		</StyledSnackBar>
	);
};

export default SnackBar;
