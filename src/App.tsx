// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import Header from './components/Header/Header';
import TokenForm from "./components/tokenForm/tokenForm";
import Header from "./components/header/header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<TokenForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
