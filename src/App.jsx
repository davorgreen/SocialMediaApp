import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import HomePage from './assets/pages/HomePage';
import ProfilePage from './assets/pages/ProfilePage';
import NotFoundPage from './assets/pages/NotFoundPage';
import Photos from './assets/components/Photos';
import Friends from './assets/components/Friends';
import About from './assets/components/About';
import SavedPosts from './assets/pages/SavedPosts';
import Notification from './assets/pages/Notification';
import Register from './assets/pages/Register';
import Login from './assets/pages/Login';
import ProtectedRoute from './assets/pages/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './slices/UserSlice';

function App() {
  function AuthChecker() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch, location]);

    return null;
  }


  return (
    <Router>
      <AuthChecker />
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/profile/:component' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/photos' element={<ProtectedRoute><Photos /></ProtectedRoute>} />
        <Route path='/friends' element={<ProtectedRoute><Friends /></ProtectedRoute>} />
        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path='/savedposts' element={<ProtectedRoute><SavedPosts /></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><Notification /></ProtectedRoute>} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />


        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
