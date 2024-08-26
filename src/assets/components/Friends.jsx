import Friend from "./Friend"

function Friends() {
    return (
        <div className="flex flex-col gap-5 items-center md:items-start bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl mb-2 font-bold text-blue-500">Friends</h2>
            <div className="grid-rows-1 md:grid grid-cols-2 gap-6">
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
            </div>
        </div>
    )
}

export default Friends