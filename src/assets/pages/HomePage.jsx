import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import CreatePost from '../components//CreatePost'
import Post from '../components/Post'
import Story from '../components/Story'


function HomePage() {
    return (
        <div>
            <Header />+
            <Story />
            <div className="flex flex-col max-w-7xl mx-auto mt-5 gap-8 md:flex-row">
                <div className="md:w-1/4 w-[420px]">
                    <Sidebar />
                </div>
                <div className="w-3/4 ml-20 md:ml-0">
                    <CreatePost />
                    <Post />
                </div>
            </div>
        </div>
    )
}

export default HomePage