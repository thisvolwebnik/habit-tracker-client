import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { email, password, name });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>Регистрация</h2>
      {error && <p className='text-red-500 mb-2'>{error}</p>}
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label className='block mb-1' htmlFor='your-name'>
            Имя (необязательно)
          </label>
          <input
            className='w-full border rounded px-3 py-2'
            id='your-name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className='block mb-1' htmlFor='your-email'>
            Email
          </label>
          <input
            className='w-full border rounded px-3 py-2'
            id='your-email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='block mb-1' htmlFor='your-password'>
            Пароль
          </label>
          <input
            className='w-full border rounded px-3 py-2'
            id='your-password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'
          type='submit'
        >
          Зарегистрироваться
        </button>
      </form>
      <p className='mt-4 text-center'>
        Уже есть аккаунт?
        <Link to='/login' className='text-blue-500'>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
