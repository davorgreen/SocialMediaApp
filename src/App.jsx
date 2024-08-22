import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './assets/pages/HomePage'
import ProfilePage from './assets/pages/ProfilePage'
import NotFoundPage from './assets/pages/NotFoundPage'
import Photos from './assets/components/Photos'
import Friends from './assets/components/Friends'
import About from './assets/components/About'
import SavedPosts from './assets/pages/SavedPosts'
import Notification from './assets/pages/Notification'
import Register from './assets/pages/Register'



function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:component" element={<ProfilePage />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/photos' element={<Photos />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/about' element={<About />} />
        <Route path='/savedposts' element={<SavedPosts />} />
        <Route path='/notifications' element={<Notification />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
