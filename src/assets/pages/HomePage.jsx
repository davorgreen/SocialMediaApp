import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import CreatePost from '../components//CreatePost'
import Post from '../components/Post'
import Story from '../components/Story'


function HomePage() {
    return (
        <div>
            <Header />
            <Story />
            <div className="flex max-w-7xl mx-auto mt-5 gap-8">
                <div className="w-1/4">
                    <Sidebar />
                </div>
                <div className="w-3/4">
                    <CreatePost />
                    <Post />
                </div>
            </div>
        </div>
    )
}

export default HomePage