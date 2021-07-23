import StyledButton from "./styled";

const Button = ({
	type,
	fontSize,
	children,
	inverted,
	linkNested,
	...props
}) => {
	return (
		<StyledButton
			type={type}
			fontSize={fontSize}
			{...props}
			inverted={inverted}
			linkNested={linkNested}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
