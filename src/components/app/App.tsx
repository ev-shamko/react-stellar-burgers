import React from 'react';
import logo from '../../images/logo.svg';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';

function App() {
  return (
    <>
      <AppHeader />
      <p className='text_type_main-medium'>Параграф вне хедера</p>
    </>
  );
}

export default App;
