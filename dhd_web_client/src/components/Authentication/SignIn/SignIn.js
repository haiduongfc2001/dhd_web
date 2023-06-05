import React, {useContext, useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import logoDHD from "~/assets/images/logo_dhdadmin.png";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "~/context/AuthContext";
import {toast, ToastContainer} from "react-toastify";
import usePasswordToggle from "~/hooks/usePasswordToggle";

import classNames from "classnames/bind";
import styles from "../Authentication.module.scss";
import api from "~/api/api";
const cx = classNames.bind(styles)

function SignIn() {

    const { setIsLoggedIn, setUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle();

    const [errorMessage, setErrorMessage] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    useEffect(() => {
        setErrorMessage('');
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            navigate('/');
        }
    }, [setIsLoggedIn, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email) {
            await setErrorMessage('Xin vui lòng nhập email của bạn!');
            return;
        }
        if (!password) {
            await setErrorMessage('Xin vui lòng nhập mật khẩu của bạn!');
            return;
        }

        try {

            const response = await api.post('/login', {
                email,
                password,
            });

            const { token, user_id } = response.data;
            // Save the token to local storage
            localStorage.setItem('token', token);

            localStorage.setItem('user_id', user_id);

            setIsLoggedIn(true);

            if (user_id) {
                api.get(`/user/${user_id}`)
                    .then((response) => {
                        setUser(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            // setEmail('');
            // setPassword('');
            // setSuccess(true);

            navigate('/');
            toast.success('Logged in successfully!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Login Failed!');
            }
            toast.error('Login Failed!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    };

    return (
        <div className={cx('wrapper')}>
            <MDBContainer fluid className={cx('signin-form')}>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-light text-black my-5 mx-auto'
                                 style={{borderRadius: '1rem', maxWidth: '400px'}}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                                {/*<h2 className="fw-bold mb-2 text-uppercase">Login</h2>*/}
                                <img
                                    src={logoDHD}
                                    alt="logo dhd"
                                    className={cx('logo-admin')}
                                />
                                <p className="text-black-150 mt-3 mb-5">
                                    Vui lòng đăng nhập bằng tài khoản của bạn!
                                </p>

                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label={
                                        <>
                                            Email Address{" "}
                                            <span
                                                style={{color: "red"}}
                                                dangerouslySetInnerHTML={{__html: "*"}}
                                            />
                                        </>
                                    }
                                    type='email'
                                    size='lg'
                                    // style={{maxWidth: '250px'}}
                                    autoFocus
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label={
                                        <>
                                            Your Password{" "}
                                            <span
                                                style={{color: "red"}}
                                                dangerouslySetInnerHTML={{__html: "*"}}
                                            />
                                        </>
                                    }
                                    type={PasswordInputType}
                                    size='lg'
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                    {password && (
                                        <span
                                            className={cx('password-toogle-icon')}
                                            onClick={toggleVisibility}
                                        >
                                            {ToggleIcon}
                                        </span>
                                    )}
                                </MDBInput>

                                {/*<p ref={errRef} className={errMsg ? "errmsg text-danger" : "offscreen"} aria-live="assertive">{errMsg}</p>*/}

                                {/*{error && <p className='text-danger'>{error}</p>}*/}
                                {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}
                                {notificationMessage && <p className={'text-danger'}>{notificationMessage}</p>}

                                <p className='small mb-3 pb-lg-2'>
                                    <NavLink
                                        className='text-black-100'
                                             to='/forgot-password'
                                    >
                                        Forgot password
                                    </NavLink>
                                </p>

                                <MDBBtn
                                    className='mx-2 px-5 text-black'
                                    color='red'
                                    size='lg'
                                    style={{backgroundColor: '#a69c9c', fontWeight: '600'}}
                                    onClick={handleLogin}
                                >
                                    Login
                                </MDBBtn>

                                <div className='mt-2'>
                                    <p className="mb-0 mt-2">Haven't an account?
                                        <Link to="/register" className="text-black-50 fw-bold ms-1">
                                            Register
                                        </Link>
                                    </p>
                                </div>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <ToastContainer/>
        </div>
    );
}

export default SignIn;