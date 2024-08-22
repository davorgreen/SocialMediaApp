import { Link } from "react-router-dom"


function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-blue-700">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-6">Oops! Page not found.</p>
            <Link to={'/'}
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Go back to Home
            </Link>
        </div>
    )
}

export default NotFoundPage