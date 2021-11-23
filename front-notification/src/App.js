import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Kpi from './Components/MainPage/Kpi';
import MainPage from './Components/MainPage/MainPage';
import NavBar from './Components/MainPage/NavBar';
import Tips from './Components/MainPage/Tips';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/kpi" element={<Kpi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
