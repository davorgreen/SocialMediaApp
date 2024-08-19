import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './assets/pages/HomePage'
import ProfilePage from './assets/pages/ProfilePage'
import NotFoundPage from './assets/pages/NotFoundPage'
import Photos from './assets/pages/Photos'
import Friends from './assets/pages/Friends'
import About from './assets/pages/About'
import Posts from './assets/pages/Posts'



function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/photos' element={<Photos />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/about' element={<About />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </Router>
  )
}

export default App
