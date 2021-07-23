import { ThemeProvider } from "styled-components";
import GlobalStyle from "./components/GlobalStyle";
import Routes from "./Routes";

const theme = {
	colors: {
		primary: "#561493",
		secondary: "white",
		neutral: "black",
		red: "red",
		green: "green",
		boxShadow: "rgba(0,0,0,.5)",
		placeholder: "#B8B8B8",
	},

	borderRadius: "1.5rem",
	btnBorderRadius: ".5rem",
	inputBorderRadius: ".5rem",
};

const App = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Routes />
			</ThemeProvider>
		</>
	);
};

export default App;
