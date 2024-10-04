
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Home from './HomePage.js';
import CreateFlashcards from './CreateFlashcards';
import './App.css';
import LoadingScreen from './LoadingScreen.js';
import CodeEditor from './CodeEditor';
import FlashCards from './FlashCards';
import Java from './Java';
import Python from './Python';
import C from './C';
const App = () => {
  
  return (
    <Router>
      <LoadingScreen/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/create" element={<CreateFlashcards />} />
        <Route path="/flashcards" element={<FlashCards />} />
        <Route path="/java" element={<Java />} />
        <Route path="/python" element={<Python />} />
        <Route path="/c" element={<C />} />
        <Route path="/code-editor" element={<CodeEditor />} /> {/* Add route for CodeEditor */}
      </Routes>
    </Router>
  );
};

export default App;

