import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard';
import Log from './login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/login" element={<Log />} />
        <Route path="/" element={<Dashboard />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 