import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';
import {lightBlue, pink, teal} from "@mui/material/colors";
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: pink,
        mode: "light"
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppWithRedux/>
        </ThemeProvider>
    </Provider>
);