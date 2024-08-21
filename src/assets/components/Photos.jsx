
function Photos() {
    return (

        <div className="flex flex-col gap-5 bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 w-full gap-4">
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kIXxsr3a5ZPu5jgFkvQur4xICeuqy1J9pQ&s" alt="Image 1" className="w-full h-auto transition-transform duration-300 hover:scale-105" />
                </div>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kIXxsr3a5ZPu5jgFkvQur4xICeuqy1J9pQ&s" alt="Image 2" className="w-full h-auto transition-transform duration-300 hover:scale-105" />
                </div>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kIXxsr3a5ZPu5jgFkvQur4xICeuqy1J9pQ&s" alt="Image 3" className="w-full h-auto transition-transform duration-300 hover:scale-105" />
                </div>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kIXxsr3a5ZPu5jgFkvQur4xICeuqy1J9pQ&s" alt="Image 4" className="w-full h-auto transition-transform duration-300 hover:scale-105" />
                </div>
            </div>
        </div>


    );
}

export default Photos;
