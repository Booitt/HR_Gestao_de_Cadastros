import InputWrapper from "./styled";
import InputMask from "react-input-mask";

const maskedInput = (value, onChange, mask, name, placeholder) => {
	return (
		<InputMask mask={mask} value={value} onChange={onChange} maskChar={null}>
			{(inputProps) => (
				<InputWrapper.Input id={name} name={name} placeholder={placeholder} {...inputProps} />
			)}
		</InputMask>
	);
};

const Input = ({
	children,
	value,
	onChange,
	type = "text",
	name,
	placeholder,
	width,
	marginLeft
}) => {
	let renderInput = (
		<InputWrapper.Input
			type={type}
			id={name}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);

	if (type.toLowerCase() === "cpf") {
		const mask = "999.999.999-99";
		renderInput = maskedInput(value, onChange, mask, name, placeholder);
	}

	if (type.toLowerCase() === "cep") {
		const mask = "99.999-999";
		renderInput = maskedInput(value, onChange, mask, name, placeholder);
	}

	return (
		<InputWrapper width={width} marginLeft={marginLeft}>
			<InputWrapper.Label htmlFor={name}>{children}</InputWrapper.Label>
			{renderInput}
		</InputWrapper>
	);
};

export default Input;
