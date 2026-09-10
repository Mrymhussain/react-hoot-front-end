import { useContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import HootList from './components/HootList/HootList';

// Services
import * as hootService from './services/hootService';

// Context
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      console.log('hootsData:', hootsData);

      setHoots(hootsData);
    };

    if (user) fetchAllHoots();
  }, [user]);

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path='/'
          element={user ? <Dashboard /> : <Landing />}
        />

        {user ? (
          <>
            {/* Protected routes */}
            <Route
              path='/hoots'
              element={<HootList hoots={hoots} />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes */}
            <Route
              path='/sign-up'
              element={<SignUpForm />}
            />

            <Route
              path='/sign-in'
              element={<SignInForm />}
            />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;