import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import FuncWrapperComp from './components/usingFunc/FuncWrapperComp';
import FuncContextWrapper from './components/usingContextAPI/FuncContextWrapper';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/mt-react-practice' element={<Home />} />
        <Route path='/usingfunc' element={<FuncWrapperComp />}  />
        <Route path='/contextapi' element={<FuncContextWrapper />}  />
      </Routes>
    </Router>
  );
}

export default App;
