import { Link } from 'react-router-dom'
import image from '../images/61ucVY54GzL.jpg'
//icons
import { FaSearch } from 'react-icons/fa'

function Header() {
    return (
        <div className="flex justify-start gap-5 h-36 container mx-auto items-center shadow-xl shadow-blue-200">
            <img src={image} alt='dogs' className='w-1/5 h-full rounded-xl' />
            <Link to={'/'}>   <p className='text-5xl font-bold text-blue-500'>PAWConnect</p></Link>
            <div className="flex items-center w-1/3 bg-white border-2 border-blue-500 rounded-full px-4 py-2">
                <FaSearch size={30} className="text-blue-500 mr-2 font-bold" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="grow font-semibold text-2xl bg-transparent outline-none text-blue-700 placeholder-blue-500"
                />
            </div>
        </div>
    )
}

export default Header