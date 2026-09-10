import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import styles from './NavBar.module.css';


const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.container}>
     <Link to='/'>HOME</Link>

      {user ? (
        <ul>
          <li>
            <Link to='/hoots'>HOOTS</Link>
          </li>

          <li>
            <Link to='/hoots/new'>NEW HOOT</Link>
          </li>

          <li>
            <Link to='/' onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to='/sign-in'>SIGN IN</Link>
          </li>

          <li>
            <Link to='/sign-up'>SIGN UP</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;