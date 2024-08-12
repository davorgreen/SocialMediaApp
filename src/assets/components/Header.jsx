import image from '../images/61ucVY54GzL.jpg'

function Header() {
    return (
        <div className="flex justify-start gap-5 h-36 container mx-auto items-center shadow-xl shadow-blue-200">
            <img src={image} alt='dogs' className='w-1/5 h-full rounded-xl' />
            <p className='text-5xl font-bold text-blue-500'>PAWConnect</p>
        </div>
    )
}

export default Header