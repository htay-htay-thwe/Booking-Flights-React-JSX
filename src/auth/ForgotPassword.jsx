// ForgotPassword.jsx
import React, { useState } from 'react';
import { api } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await api.post('/forgot-password', {
                email,
            });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className=" flex items-center justify-center min-h-screen mx-auto">
            <div className='max-w-md border border-gray-300 p-6 bg-white rounded-lg shadow-lg'>
                <div className='flex gap-3'>
                    <div className='mt-1 ' onClick={() => window.history.back()}><FontAwesomeIcon icon={faBackward} className="text-lg hover:text-gray-700" /></div>
                    <div className="text-2xl font-bold mb-4">Forgot Password</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="border p-2 w-full rounded mb-4"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded "
                    >
                        Send Reset Link
                    </button>
                </form>
                {message && <p className="text-green-600 mt-4">{message}</p>}
                {error && <p className="text-red-600 mt-4">{error}</p>}</div>
        </div>
    );
};

export default ForgotPassword;
