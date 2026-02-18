import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Habits from './components/Habits';
import Register from './components/Register';
import Header from './components/Header';
import Profile from './components/Profile';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
        <Route path='/' element={user ? <Habits /> : <Navigate to='/login' />} />
        <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
