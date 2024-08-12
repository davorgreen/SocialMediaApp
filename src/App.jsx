import './App.css'
import Card from './assets/components/Card'
import Sidebar from './assets/components/Sidebar'


function App() {


  return (
    <>
      <div className="flex max-w-5xl mx-auto mt-5 gap-8">
        <div className="w-1/3">
          <Sidebar />
        </div>
        <div className="grow">
          <Card className="">
            form here
          </Card>
          <Card>first post here</Card>
        </div>
      </div>
    </>
  )
}

export default App
