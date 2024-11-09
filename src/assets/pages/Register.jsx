//formik
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//hook
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    const navigate = useNavigate();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        city: '',
        countryCode: '',
        AboutMe: '',
        termsAndConditions: false,
    };

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(3, "Name should be at least 3 characters long")
            .required('Name is required'),
        lastName: Yup.string()
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
        phone: Yup.string()
            .matches(/^\+\d{1,3}\d{9,}$/, "Phone number must be in the format +[country code][number]")
            .required('Phone number is required'),
        gender: Yup.string()
            .oneOf(['male', 'female', 'undeclared'], 'Invalid Gender')
            .required('Gender is required'),
        termsAndConditions: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions'),
        city: Yup.string()
            .min(2, 'City must be at least 2 characters long')
            .max(50, 'City can be at most 50 characters long')
            .required('City is required'),
        countryCode: Yup.string()
            .matches(/^[A-Z]{2}$/, 'Country code must be exactly 2 uppercase letters')
            .required('Country code is required'),
        AboutMe: Yup.string()
            .max(500, 'About me can be at most 200 characters long'),
    });

    const onSubmit = async (values, { resetForm }) => {
        const dataToSend = {
            ...values,
            gender: values.gender.toLowerCase(),
        };
        try {
            const response = await axios.post('https://green-api-nu.vercel.app/api/users/register', dataToSend);
            resetForm();
            navigate('/login');
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md">
                <div className="flex justify-between mb-6">
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Log In
                    </button>
                </div>
                <h1 className="text-2xl font-bold text-blue-600 mb-6">Register</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
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
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <Field
                                    type="text"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <Field
                                    type="text"
                                    name="city"
                                    placeholder="Enter your city"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <Field
                                    type="text"
                                    name="countryCode"
                                    placeholder="Enter your country code"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="countryCode" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <Field
                                    as="textarea"
                                    name="AboutMe"
                                    placeholder="Tell us about yourself (optional)"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="aboutMe" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-bold text-blue-700 underline">Gender</label>
                                <div className="flex items-center space-x-4 font-semibold text-blue-500">
                                    <label className="flex items-center">
                                        <Field type="radio" name="gender" value="male" className="mr-2" />
                                        Male
                                    </label>
                                    <label className="flex items-center">
                                        <Field type="radio" name="gender" value="female" className="mr-2" />
                                        Female
                                    </label>
                                    <label className="flex items-center">
                                        <Field type="radio" name="gender" value="undeclared" className="mr-2" />
                                        Undeclared
                                    </label>
                                </div>
                                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <Field type="checkbox" name="termsAndConditions" className="mr-2" />
                                    I accept the terms and conditions
                                </label>
                                <ErrorMessage name="termsAndConditions" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                disabled={isSubmitting}
                            >
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Registration;
