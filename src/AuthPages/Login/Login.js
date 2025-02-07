import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import basestyle from '../Base.module.css';
import loginstyle from './Login.module.css';

function Login({ setUserState }) {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        email: '',
        password: '',
    });

    function changeHandler(e) {
        const { name, value } = e.target;
        setUserDetails({
            ...user,
            [name]: value,
        });
    }

    function validateForm(values) {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            error.email = 'Email is required';
        } else if (!regex.test(values.email)) {
            error.email = 'Please enter a valid email address';
        }
        if (!values.password) {
            error.password = 'Password is required';
        }
        return error;
    }

    function loginHandler(e) {
        e.preventDefault();
        setFormErrors(validateForm(user));
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(user);
            axios.post('http://localhost:8084/auth/login', user).then(({ data: { token } }) => {
                if (token) {
                    localStorage.setItem('authToken', token);
                    console.log('token', token);
                    alert('Login successful!');
                    navigate('/', { replace: true });
                } else {
                    alert('Login failed! No token received.');
                }
            });
        }
    }, [formErrors, isSubmit, navigate, user]);
    return (
        <div className={loginstyle.login}>
            <form>
                <h1>Login</h1>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={changeHandler}
                    value={user.email}
                />
                <p className={basestyle.error}>{formErrors.email}</p>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={changeHandler}
                    value={user.password}
                />
                <p className={basestyle.error}>{formErrors.password}</p>
                <button type="button" className={basestyle.button_common} onClick={loginHandler}>
                    Login
                </button>
            </form>
            <NavLink to="/signup">Not yet registered? Register Now</NavLink>
        </div>
    );
}

export default Login;
