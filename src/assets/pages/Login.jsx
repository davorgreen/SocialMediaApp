import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/UserSlice';
import { getUser } from '../../slices/CombinedSlice';

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password should be at least 8 characters long')
            .required('Password is required'),
    });

    const onSubmit = async (values) => {
        try {
            const response = await axios.post('https://green-api-nu.vercel.app/api/users/login', values);
            const { token, user } = response.data;
            dispatch(login({ token, user }));
            dispatch(getUser(user));
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
            console.error('Error during login', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md">
                <button
                    className="text-blue-500 hover:underline mb-4"
                    onClick={() => navigate('/register')}
                >
                    Return to the Register
                </button>
                <h1 className="text-2xl font-bold text-blue-600 mb-6">Log In</h1>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Logging in...' : 'Log In'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
