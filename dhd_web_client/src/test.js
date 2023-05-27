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
import {useNavigate} from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const response = await axios.post('http://localhost:5000/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setErrorMessage(response.data.message);
            navigate('/');
            setEmail('');
            setPassword('');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error registering user!');
        }
    };

    const formRegisterArray = [
        {
            id: 'email',
            type: 'email',
            label: (
                <>
                    Your Email{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            value: email,
            onChange: handleEmailChange,
        },
        {
            id: 'password',
            type: 'password',
            label: (
                <>
                    Your Password{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            value: password,
            onChange: handlePasswordChange,
        },
    ]

    return (
        <div>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol col='12'>
                        <MDBCard>
                            <MDBCardBody>
                                {formRegisterArray.map((form, index) => (
                                    <MDBInput
                                        key={index}
                                        required
                                        type={form.type}
                                        id={form.id}
                                        label={form.label}
                                        value={form.value}
                                        onChange={form.onChange}
                                    />
                                ))}

                                {errorMessage && <p className={'text-danger'}>{errorMessage}</p> }

                                <MDBBtn onClick={handleRegister}>
                                    Register
                                </MDBBtn>
                            </MDBCardBody>

                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Register;