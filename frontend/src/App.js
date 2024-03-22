import React from 'react';
import './index.css';
import StagiaireList from './components/StagiaireList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddStagiaire from './components/AddStagiaire';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<StagiaireList />}/>
        <Route index path='/AjouterStagiare' element={<AddStagiaire />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;