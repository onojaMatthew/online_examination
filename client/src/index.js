import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import './index.css';
import App from './components/App';
import { rootReducer } from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

let store;

process.env.NODE_ENV === "development" ? store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))) :
store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

