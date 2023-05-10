import React, {useState} from 'react';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput, MDBCheckbox,
}
    from 'mdb-react-ui-kit';
import classNames from "classnames/bind";
import styles from "../Authentication.module.scss";
import logoDHD from "~/assets/images/logo_dhdadmin.png";
import {Link} from "react-router-dom";

const cx = classNames.bind(styles)

function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
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
                                    label='Your name'
                                    id='formControlLg'
                                    type='text'
                                    size='lg'
                                    autoFocus
                                    autoComplete='off'
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label='Your UserName'
                                    id='formControlLg'
                                    autoComplete='off'
                                    type='text'
                                    size='lg'
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label='Email address'
                                    id='formControlLg'
                                    type='email'
                                    size='lg'
                                    autoComplete='off'
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
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    labelClass='text-black'
                                    label='Repeat Password'
                                    id='formControlLg'
                                    type='text'
                                    size='lg'
                                    value={repeatPassword}
                                    onChange={(event) => setRepeatPassword(event.target.value)}
                                />

                                {error && <p className='text-danger'>{error}</p>}


                                <div className='d-flex justify-content-center mb-4 mt-4'>
                                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                                </div>

                                <MDBBtn
                                    className='mx-2 px-5 text-black'
                                    color='red'
                                    size='lg'
                                    style={{ backgroundColor: '#a69c9c' }}
                                    onClick={handleSubmit}
                                >
                                    Register
                                </MDBBtn>

                                <div>
                                    <p className="mb-0 mt-2">Have an account?
                                        <Link to="/signin" className="text-black-50 fw-bold ms-1">
                                            Sign In
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

export default Register;