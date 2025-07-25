import React, { useEffect, useRef } from 'react'
import { fetchUser } from '../redux/action/fetch';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

function Facebook() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const effectRun = useRef(false);

    useEffect(() => {
        if (effectRun.current) return;
        effectRun.current = true;
        const code = new URLSearchParams(location.search).get('code');

        if (!code) {
            navigate('/login/page');
            return;
        }

        fetch('http://localhost:8000/api/facebook/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        })
            .then(res => res.json())
            .then(data => {
                console.group(data);
                if (data.access_token) {
                    localStorage.setItem('token', data.access_token);
                    dispatch(fetchUser(data.user));
                    navigate('/');
                } else {
                    navigate('/login/page');
                }
            }).catch(() => navigate('/login/page'));

    }, []);

    return (
        <div className="flex items-center text-gray-800 justify-center h-screen text-xl">
            Logging you in via Facebook ...
        </div>
    )
}

export default Facebook
