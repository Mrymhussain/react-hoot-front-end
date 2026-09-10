import { useContext, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';

// Services
import * as hootService from './services/hootService';

// Context
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  const [hoots, setHoots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      setHoots(hootsData);
    };

    if (user) fetchAllHoots();
  }, [user]);

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);

    setHoots([newHoot, ...hoots]);

    navigate('/hoots');
  };

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

            <Route
              path='/hoots/new'
              element={<HootForm handleAddHoot={handleAddHoot} />}
            />

            <Route
              path='/hoots/:hootId'
              element={<HootDetails />}
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