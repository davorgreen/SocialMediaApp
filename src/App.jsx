import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './assets/pages/HomePage'
import ProfilePage from './assets/pages/ProfilePage'



function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
