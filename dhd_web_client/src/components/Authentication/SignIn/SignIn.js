import React, {useState} from 'react';
import axios from 'axios';
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
import classNames from "classnames/bind";
import styles from "../Authentication.module.scss";
import logoDHD from "~/assets/images/logo_dhdadmin.png";
import {Link} from "react-router-dom";

const cx = classNames.bind(styles)

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/admin/signin', {
                email,
                password,
            });

            if (response.status === 200) {
                window.location.href = 'http://localhost:3000/';
            }
        } catch (error) {
            setError('Invalid email or password');
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
                                    className={cx('logoadmin')}
                                />
                                <p className="text-black-150 mt-3 mb-3">
                                    Please login with your account!
                                </p>

                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label='Email address'
                                    id='formControlLg'
                                    type='email'
                                    size='lg'
                                    autoFocus
                                    // autoComplete='off'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label='Password'
                                    id='formControlLg'
                                    type='password'
                                    size='lg'
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />

                                {error && <p className='text-danger'>{error}</p>}

                                <p className='small mb-3 pb-lg-2'>
                                    <a className='text-black-50' href='/signin'>
                                        Forgot password?
                                    </a>
                                </p>

                                <MDBBtn
                                    className='mx-2 px-5 text-black'
                                    color='red'
                                    size='lg'
                                    style={{ backgroundColor: '#a69c9c' }}
                                    onClick={handleSubmit}
                                >
                                    Sign in
                                </MDBBtn>

                                <div>
                                    <p className="mb-0 mt-2">Don't have an account?
                                        <Link to="/register" className="text-black-50 fw-bold ms-1">
                                            Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default SignIn;