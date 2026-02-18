import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Habits from './components/Habits';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {token && (
          <div className="flex justify-end p-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={logout}
            >
              Выйти
            </button>
          </div>
        )}
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login setToken={setToken} />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register setToken={setToken} />}
          />
          <Route path="/" element={token ? <Habits /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
