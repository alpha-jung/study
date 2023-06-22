import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import "./App.css";
import Title from "./Title";
import Login from "./Login";
import Main from "./Main";

function App() {

  return (
    <div className="wrapper">
      <Title title={"Hello World!"} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/main" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
