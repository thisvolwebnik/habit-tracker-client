import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className='bg-white shadow'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <Link className='text-xl font-bold text-blue-600' to='/'>
          Трекер привычек
        </Link>
        {user && (
          <div className='flex items-center gap-4'>
            <Link className='text-gray-700 hover:text-blue-600' to='/profile'>
              {user.name || user.email}
            </Link>
            <button
              className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
              onClick={logout}
            >
              Выйти
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
