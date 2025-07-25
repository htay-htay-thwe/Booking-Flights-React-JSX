// src/components/RegisterForm.jsx
import React, { useState } from "react";
import { fetchUser } from "../redux/action/fetch";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { api, apiData } from "../api";

const LoginForm = () => {
    const [errors, setErrors] = useState({});
    const [err, setErr] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation();
    const [loading, setLoading] = useState(false);
    // const [url, setUrl] = useState('');
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        accepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: `${formData.first_name} ${formData.last_name}`,
            email: formData.email,
            password: formData.password,
            accepted: formData.accepted
        }

        try {
            const res = await apiData.post("/login", data);
            localStorage.setItem("token", res.data.access_token);
            setErrors({});
            setLoading(true);
            dispatch(fetchUser(res.data.user));
            setLoading(false);
            navigate('/');
            // alert("Login successful!");

        } catch (error) {
            setErr(error.response.data.error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                console.log('error', errors);
            } else {
                console.error("Unexpected error:", error);
            }
        };
    };

    const handleGitHubLogin = async () => {
        setLoading(true);
        const res = await api.get('/github/redirect');
        setLoading(false);
        window.location.href = res.data.url;
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const res = await api.get('/google/redirect');
        setLoading(false);
        window.location.href = res.data.url;
    };

    const handleFacebookLogin = async () => {
        setLoading(true);
        const res = await api.get('/facebook/redirect');
        setLoading(false);
        window.location.href = res.data.url;
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-purple-100">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-pink-100/10 bg-opacity-80 rounded">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}

            <div className="bg-white flex rounded-2xl shadow-lg w-[900px] overflow-hidden">
                <div className="w-1/2 bg-cover bg-opacity-40 bg-center hidden md:block" style={{ backgroundImage: "url('/img/plane.jpg')" }}>
                    <div className=" bg-opacity-40 h-full text-white flex flex-col justify-center items-center p-10">
                        <h2 className="text-4xl font-bold mb-4 text-black">Welcome back,</h2>
                        <p className="text-center mb-4 text-black font-semibold">
                            Book your next flight with ease — fast, secure, and affordable air travel at your fingertips.
                        </p>

                        <a className="underline text-black font-semibold hover:text-gray-800">Learn More</a>

                    </div>
                </div>

                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-semibold mb-2">Login</h2>
                    <p className="text-sm text-gray-600 mb-6">Create your account. It’s free and only takes a minute</p>
                    <p className="text-red-500 mb-2 rounded-lg">{err}</p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 px-3 py-2 rounded-md"
                            />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 px-3 py-2 rounded-md"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs">{errors.name[0]}</p>}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email[0]}</p>}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password[0]}</p>}
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                name="accepted"
                                checked={formData.accepted}
                                onChange={handleChange}
                                className="mr-2"
                            />

                            <div className="flex  gap-6">
                                <div>
                                    I accept the <a href="#" className="text-purple-500 underline">Terms of Use</a> &{" "}
                                    <a href="#" className="text-purple-500 underline">Privacy Policy</a>
                                </div>
                                <Link to="/register/page">
                                    <span className="underline text-gray-400 font-semibold hover:text-gray-600">No Account?</span>
                                </Link>
                            </div>
                        </label>

                        <div>
                            {errors.accepted && <p className="text-red-500 text-xs">{errors.accepted[0]}</p>}
                        </div>

                        <Link to="/forgot/password">
                            <span className="underline text-gray-400 text-sm hover:text-gray-600">Forgot password?</span>
                        </Link>

                        <button
                            type="submit"
                            className="w-full mt-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-md"
                        >
                            Login
                        </button>
                    </form>

                    {/* <!-- Social Login Circle Buttons --> */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                        {/* <!-- Facebook --> */}
                        <a onClick={handleFacebookLogin}
                            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#3b5998] hover:opacity-90 transition">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5v-2.3c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6V12H17l-.5 3h-2.2v7A10 10 0 0022 12z" />
                            </svg>
                        </a>

                        {/* <!-- Google --> */}
                        <a onClick={handleGoogleLogin}
                            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#4285F4] hover:opacity-90 transition">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 48 48">
                                <path fill="#fff"
                                    d="M44.5 20H24v8.5h11.8C34.1 33.4 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.4-7.5 21-17.5 0-.8.5-5.5-.5-7.5z" />
                            </svg>
                        </a>

                        {/* <!-- Instagram --> */}
                        <a onClick={handleGitHubLogin}
                            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#e1306c] hover:opacity-90 transition">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#fff"
                                    d="M24 4C12.95 4 4 12.95 4 24c0 8.85 5.72 16.38 13.67 19.04 1 .18 1.37-.44 1.37-.98 0-.48-.02-1.75-.03-3.44-5.56 1.21-6.74-2.68-6.74-2.68-.9-2.3-2.2-2.91-2.2-2.91-1.8-1.23.14-1.21.14-1.21 1.99.14 3.04 2.05 3.04 2.05 1.77 3.03 4.64 2.16 5.77 1.65.18-1.28.7-2.16 1.27-2.66-4.44-.5-9.12-2.22-9.12-9.87 0-2.18.78-3.97 2.05-5.37-.21-.5-.89-2.53.2-5.26 0 0 1.67-.53 5.48 2.05 1.58-.44 3.28-.67 4.96-.68 1.68.01 3.37.24 4.95.68 3.8-2.58 5.46-2.05 5.46-2.05 1.1 2.73.42 4.76.2 5.26 1.28 1.4 2.04 3.19 2.04 5.37 0 7.67-4.7 9.37-9.17 9.85.72.62 1.37 1.85 1.37 3.73 0 2.69-.02 4.86-.02 5.52 0 .54.37 1.17 1.38.97C38.3 40.36 44 32.81 44 24 44 12.95 35.05 4 24 4z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
