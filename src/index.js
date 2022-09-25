import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import { Customer, Satisfaction, Visit, Finished } from './pages';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const theme = createTheme({
  components: {
    MuiInputBase: {
        styleOverrides: {
            input: {
                color: 'white',
                '&::placeholder': {
                    color: '#fff',
                    fontSize: 12,
                },
                '&::label': {
                    color: '#fff',
                    fontSize: 20,
                },
            }
        }
    }
  },
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536 // large screens
    }
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  palette: {
    primary: {
      lightest: '#73c1a9',
      light: '#45ad8d',
      main: '#169870',
      dark: '#107254',
      darkest: '#0b4c38',
      text: '#fff',
      contrasText: '#fff',
    },
    secondary: {
      lightest: '#f8c575',
      light: '#f5b247',
      main: '#F39F19',
      dark: '#b67713',
      darkest: '#7a500d',
      text: '#fff',
      contrasText: '#fff',
    },
    brown: {
      lightest: '#d9c1a0',
      light: '#ccad80',
      main: '#bf9860',
      dark: '#8f7248',
      darkest: '#604c30',
      text: '#fff',
      contrasText: '#fff',
    },
    red: {
      lightest: '#f77c76',
      light: '#f45049',
      main: '#f1241b',
      dark: '#b51b14',
      darkest: '#79120e',
      text: '#fff',
      contrasText: '#fff',
    },
    blue: {
      lightest: '#789acf',
      light: '#4b78bf',
      main: '#1e56af',
      dark: '#164183',
      darkest: '#0f2b58',
      text: '#fff',
      contrasText: '#fff',
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Customer/>,
  },
  {
    path: "/satisfaction",
    element: <Satisfaction/>,
  },
  {
    path: "/visit",
    element: <Visit/>,
  },
  {
    path: "/finished",
    element: <Finished/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

export default root;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
