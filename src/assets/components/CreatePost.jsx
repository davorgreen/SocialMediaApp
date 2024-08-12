

function CreatePost() {
    return (
        <div className="flex flex-col  items-start gap-3 bg-white shadow-lg rounded-md shadow-gray-300 p-6 mb-6">
            <div className="flex gap-5">
                avatar
                <textarea placeholder='Share your status...'></textarea>
            </div>
        </div>
    )
}

export default CreatePost