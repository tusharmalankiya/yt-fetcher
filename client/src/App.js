// import './App.css';
import React from 'react';
import { Container } from './AppStyles';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  return (
    <Container>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </Container>
  );
}

export default App;
