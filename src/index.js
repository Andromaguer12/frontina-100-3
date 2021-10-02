import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppIndex from './AppIndex';
import { DefaultTheme } from './constants/materialUiTheme/theme';
import store from './services/reduxToolkit/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={DefaultTheme}>
        <AppIndex />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
