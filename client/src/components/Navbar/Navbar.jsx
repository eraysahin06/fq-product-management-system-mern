import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    // You can set the username from the token if it's stored there or from another source
    setUsername('User');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-700 text-white mx-auto h-[60px]">
      <h1 className="border rounded-lg p-2">
        <Link to="/">Product Management System</Link>
      </h1>
      <ul className="flex gap-5">
        <Link className="hover:border rounded-lg p-2" to="/">
          <li>Home</li>
        </Link>
        <Link className="hover:border rounded-lg p-2" to="/about">
          <li>About</li>
        </Link>
        <Link className="hover:border rounded-lg p-2" to="/contact">
          <li>Contact</li>
        </Link>
        {isLoggedIn ? (
          <>
            <span className="p-2">Welcome, {username}</span>
            <button onClick={handleLogout} className="hover:border rounded-lg p-2">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:border rounded-lg p-2" to="/login">
              <li>Login</li>
            </Link>
            <Link className="hover:border rounded-lg p-2" to="/register">
              <li>Register</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
