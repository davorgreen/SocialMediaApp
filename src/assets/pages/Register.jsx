import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        gender: '',
        termsAndConditions: false,
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Name should be at least 3 characters long")
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password should be at least 8 characters long')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm your password'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, "Phone number is not valid")
            .min(10, 'Phone number should be at least 10 digits long')
            .required('Phone number is required'),
        gender: Yup.string()
            .oneOf(['Male', 'Female', 'Undeclared'], 'Invalid Gender')
            .required('Gender is required'),
        termsAndConditions: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions'),
    });

    const onSubmit = (values, { resetForm }) => {
        alert(JSON.stringify(values, null, 2));
        resetForm();
        navigate('/');

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md">
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold text-blue-600">{isLogin ? 'Log In' : 'Register'}</h1>
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Log In'}
                    </button>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            {!isLogin && (
                                <div>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            )}
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
                            {!isLogin && (
                                <div>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            )}
                            {!isLogin && (
                                <div>
                                    <Field
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Enter your phone number"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            )}
                            {!isLogin && (
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-blue-700 underline">Gender</label>
                                    <div className="flex items-center space-x-4 font-semibold text-blue-500">
                                        <label className="flex items-center">
                                            <Field type="radio" name="gender" value="Male" className="mr-2" />
                                            Male
                                        </label>
                                        <label className="flex items-center">
                                            <Field type="radio" name="gender" value="Female" className="mr-2" />
                                            Female
                                        </label>
                                        <label className="flex items-center">
                                            <Field type="radio" name="gender" value="Undeclared" className="mr-2" />
                                            Undeclared
                                        </label>
                                    </div>
                                    <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            )}
                            {!isLogin && (
                                <div>
                                    <label className="flex items-center">
                                        <Field type="checkbox" name="termsAndConditions" className="mr-2" />
                                        I accept the terms and conditions
                                    </label>
                                    <ErrorMessage name="termsAndConditions" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            )}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : isLogin ? 'Log In' : 'Register'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Registration;
