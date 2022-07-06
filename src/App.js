import './App.css';
import LoginScreen from './Login/LoginScreen';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MovieDetail from './MovieDetail';
import Home from './Home';

function App() {
  const token = window.localStorage.getItem('token');
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={(token)?<Home/>:<LoginScreen/>} />
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/movie_detail" element={<MovieDetail />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
