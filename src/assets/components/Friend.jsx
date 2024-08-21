import ProfileImage from "./ProfileImage"


function Friend() {
    return (
        <div className="flex gap-4"><ProfileImage />
            <div className="flex flex-col">
                <p className="text-lg font-bold text-blue-400">John Johnson</p>
                <p className="text-sm text-gray-500">5 mutual friends</p>
            </div>
        </div>
    )
}

export default Friend