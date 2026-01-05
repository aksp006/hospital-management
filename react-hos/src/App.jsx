import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard';
import Log from './login';
import Signup from './signup';

function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/login" element={<Log />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
 