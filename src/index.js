import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "store/";
import { Provider } from "react-redux";
import { colors, typography, buttons } from "styles/styles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const theme = createTheme({
	palette: { ...colors },
	typography: { ...typography },
	components: {
		MuiButton: { ...buttons },
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
