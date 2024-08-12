import './App.css'
import Card from './assets/components/Card'
import CreatePost from './assets/components/CreatePost'
import Header from './assets/components/Header'
import Sidebar from './assets/components/Sidebar'


function App() {


  return (
    <div>
      <Header />
      <div className="flex max-w-7xl mx-auto mt-5 gap-8">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="grow">
          <CreatePost />
          <Card>first post here</Card>
        </div>
      </div>
    </div>
  )
}

export default App
