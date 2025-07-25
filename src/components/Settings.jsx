import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyList, fetchUser } from '../redux/action/fetch';
import { api } from '../api';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [currencyModal, setCurrencyModal] = useState(false);
    const [currency, setCurrency] = useState({ cur: "USD", rate: 1 });
    const [errors, setErrors] = useState({});
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    const user = useSelector(state => state.flights.user);
    const [preview, setPreview] = useState(
        user?.image
            ? user?.image.startsWith('http')
                ? user?.image
                : `http://localhost:8000/storage/${user?.image}`
            : '/img/default.png'
    );
    const [image, setImage] = useState(null);
    const [changePassword, setChangePassword] = useState({
        current: '',
        password: '',
        confirmedPassword: ''
    });
    const [changeEmail, setChangeEmail] = useState({
        username: user.name || '',
        email: user.email || ''
    });
    const dispatch = useDispatch();

    const currencyApi = async () => {
        const res = await fetch('https://v6.exchangerate-api.com/v6/8ec9b0d8525f482092ffe45e/latest/USD');
        const data = await res.json();
        dispatch(fetchCurrencyList((data.conversion_rates)));
    }

    useEffect(() => {
        currencyApi();
    }, [])


    const handleChangePw = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: user.id,
                current: changePassword.current,
                password: changePassword.password,
                confirmedPassword: changePassword.confirmedPassword
            };

            const res = await api.post('/change/pw', data);
            setErrors({});
            setSuccess(res.data.message);
            dispatch(fetchUser(res.data.user));
            setErr('');
            setChangePassword({
                current: '',
                password: '',
                confirmedPassword: ''
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Unexpected error:", error);
                setErr(error.response.data.error);
            }
        };
    };

    const handleChangeEmail = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: user.id,
                username: changeEmail.username,
                email: changeEmail.email
            };

            const res = await api.post('/change/email', data);
            setErrors({});
            setSuccess(res.data.message);
            dispatch(fetchUser(res.data.user));
            setErr('');
            setChangePassword({
                username: '',
                email: ''
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Unexpected error:", error);
                setErr(error.response.data.error);
            }
        };
    };


    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('profile', image);
        formData.append('id', user.id);

        try {
            const response = await api.post('/change/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setErrors({});
            setSuccess(response.data.message);
            dispatch(fetchUser(response.data.user));
            setErr('');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Unexpected error:", error);
                setErr(error.response.data.error);
            }
        };
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChangePassword(prev => ({ ...prev, [name]: value }));
        setChangeEmail(prev => ({ ...prev, [name]: value }));
    };


    return (
        <div>
            <Navbar currency={currency} setCurrency={setCurrency} setCurrencyModal={setCurrencyModal} currencyModal={currencyModal} />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
                    <h2 className="text-2xl font-semibold mb-6">Settings</h2>

                    {/* Tabs */}
                    <div className="flex space-x-4 border-b mb-6">
                        <button
                            className={`pb-2 ${activeTab === 'account'
                                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab('account')}
                        >
                            Account
                        </button>
                        <button
                            className={`pb-2 ${activeTab === 'password'
                                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab('password')}
                        >
                            Change Password
                        </button>
                        <button
                            className={`pb-2 ${activeTab === 'email'
                                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab('email')}
                        >
                            Change Email
                        </button>
                        <button
                            className={`pb-2 ${activeTab === 'profile'
                                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Change Profile
                        </button>
                    </div>

                    {/* Content */}
                    {activeTab === 'account' && (
                        <div className="space-y-4">
                            <div>
                                <img src={
                                    user?.image
                                        ? user?.image.startsWith('http')
                                            ? user?.image
                                            : `http://localhost:8000/storage/${user?.image}`
                                        : '/img/default.png'
                                }
                                    className='h-20 w-20 rounded-full' />

                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    readOnly
                                    className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <form onSubmit={handleChangePw} className="space-y-4">
                            <div className="text-red-500 text-xs">{err}</div>
                            <div className="text-green-500 text-xs">{success}</div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <input
                                    onChange={handleInputChange}
                                    name="current"
                                    value={changePassword.current || ''}
                                    type="password"
                                    placeholder="Enter current password"
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            {errors.current && <p className="text-red-500 text-xs">{errors.current[0]}</p>}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    onChange={handleInputChange}
                                    value={changePassword.password || ''}
                                    name="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs">{errors.password[0]}</p>}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    onChange={handleInputChange}
                                    value={changePassword.confirmedPassword || ''}
                                    name="confirmedPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            {errors.confirmedPassword && <p className="text-red-500 text-xs">{errors.confirmedPassword[0]}</p>}
                            <button type='submit' className="mt-4 p-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Save Changes
                            </button>
                        </form>
                    )}

                    {activeTab === 'email' && (
                        <form onSubmit={handleChangeEmail} className="space-y-4">
                            <div className="text-red-500 text-xs">{err}</div>
                            <div className="text-green-500 text-xs">{success}</div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    onChange={handleInputChange}
                                    name="username"
                                    type="text"
                                    value={changeEmail.username}
                                    className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            {errors.username && <p className="text-red-500 text-xs">{errors.username[0]}</p>}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    onChange={handleInputChange}
                                    name="email"
                                    value={changeEmail.email}
                                    className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs">{errors.email[0]}</p>}
                            <button type="submit" className="mt-4 p-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Save Changes
                            </button>
                        </form>
                    )}

                    {activeTab === 'profile' && (
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="text-red-500 text-xs">{err}</div>
                            <div className="text-green-500 text-xs">{success}</div>
                            <label htmlFor="profile" className='mb-3'>Upload Profile Image</label>
                            {preview && (
                                <div className="mt-3">
                                    <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-full" />
                                </div>
                            )}

                            <div>
                                <input type="file" id="profile" onChange={handleChange} name="profile" accept="image/*"
                                    className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm"></input>
                            </div>
                            {errors.profile && <p className="text-red-500 text-xs">{errors.profile[0]}</p>}

                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Upload
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
