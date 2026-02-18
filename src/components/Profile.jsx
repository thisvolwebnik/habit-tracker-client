import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const res = await axios.put('/api/users/me', formData);
      updateUser(res.data);
      setMessage('Данные успешно обновлены');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при обновлении');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordData.newPassword !== !passwordData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await axios.put('/api/users/me/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage('Пароль успешно изменен');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.date?.error || 'Ошибка при смене пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Профиль пользователя</h1>
      {message && <p className='bg-green-100 text-green-700 p-3 rounded mb-4'>{message}</p>}
      {error && <p className='bg-red-100 text-red-700 p-3 rounded mb-4'>{error}</p>}
      <form className='bg-white shadow rounded p-6 mb-6' onSubmit={handleSubmit}>
        <h2 className='text-xl font-semibold mb-4'>Основные данные</h2>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='update-name'>
            Имя
          </label>
          <input
            className='w-full border rounded px-3 py-2'
            id='update-name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='update-name'>
            Email
          </label>
          <input
            className='w-full border rounded px-3 py-2'
            id='update-email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
          type='submit'
        >
          {loading ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </form>
      <form className='bg-white shadow rounded p-6 mb-6' onSubmit={handlePasswordSubmit}>
        <h2 className='text-xl font-semibold mb-4'>Смена пароля</h2>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='update-current-password'>
            Текущий пароль
          </label>
          <input
            className='w-full border rounded px-3 py-2'
            id='update-current-password'
            name='currentPassword'
            type='password'
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='update-new-password'>
            Новый пароль
          </label>
          <input
            className='w-full border rounded px-3 py-2'
            id='update-new-password'
            name='newPassword'
            type='password'
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='update-confirm-password'>
            Подтвердить новый пароль
          </label>
          <input
            className='w-full border rounded px-3 py-2'
            id='update-confirm-password'
            name='confirmPassword'
            type='password'
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
          type='submit'
        >
          {loading ? 'Смена...' : 'Сменить пароль'}
        </button>
      </form>
    </div>
  );
}

export default Profile;
