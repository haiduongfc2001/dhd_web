import React, {useContext, useEffect, useState} from 'react';
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
import {useNavigate} from "react-router-dom";
import {AuthContext} from "~/context/AuthContext";
import {toast, ToastContainer} from 'react-toastify';

function SignIn() {

    const { setIsLoggedIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

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

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            setIsLoggedIn(true);
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
            // toast.error('Login Failed!', {
            //     position: "bottom-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            // })
        }
    };

    return (
        <div>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol col='12'>
                        <MDBCard>
                            <MDBCardBody>

                                <MDBInput
                                    label='Email address'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput
                                    label='Password'
                                    type={password}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <MDBBtn onClick={handleLogin}>
                                    Login
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ToastContainer />
        </div>
    );
}

export default SignIn;