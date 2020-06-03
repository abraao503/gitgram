import React from "react";
import { ToastContainer } from 'react-toastify';
import ProviderContexts from './context';

import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

import "./styles.css";

function App() {
  return (
    <ProviderContexts>
      <Routes/>
      <ToastContainer autoClose={3000}/>
    </ProviderContexts>
  );
}

export default App;
