import React, {useState} from 'react';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput, MDBRadio,
}
    from 'mdb-react-ui-kit';
import classNames from "classnames/bind";
import styles from "../Authentication.module.scss";
import logoDHD from "~/assets/images/logo_dhdadmin.png";
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import usePasswordToggle from "~/hooks/usePasswordToggle";

const cx = classNames.bind(styles)

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    // const [repeatPassword, setRepeatPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        // Tạo formData để gửi dữ liệu và file
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setErrorMessage(response.data.message);

            navigate('/');

            setName('');
            setEmail('');
            setPhone('');
            setImage(null);
            setErrorMessage('');
            toast.success('User added successfully!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error registering user!');
            }
        }
    };

    const formRegisterArray = [
        {
            id: 'name',
            type: 'text',
            label: (
                <>
                    Your Name{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            value: name,
            onChange: handleNameChange,
        },
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
            id: 'phone',
            type: 'text',
            label: (
                <>
                    Your Phone Number{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            value: phone,
            onChange: handlePhoneChange,
        },
        {
            id: 'password',
            type: PasswordInputType,
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
        {
            id: 'image',
            type: 'file',
            label: (
                <>
                    Avatar{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            onChange: handleImageChange,
        },
    ]

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

                                {formRegisterArray.map((form, index) => (
                                    <MDBInput
                                        key={index}
                                        wrapperClass='mb-4 mx-5 w-100'
                                        labelClass='text-black'
                                        size='lg'
                                        required
                                        type={form.type}
                                        id={form.id}
                                        label={form.label}
                                        value={form.value}
                                        onChange={form.onChange}
                                        autoFocus={form.id === 'name'}
                                    >
                                        {form.id === 'password' && password && (
                                            <span className={cx('password-toogle-icon')} onClick={toggleVisibility}>
                                                {ToggleIcon}
                                            </span>
                                        )}
                                    </MDBInput>
                                ))}

                                {errorMessage && <p className={'text-danger'}>{errorMessage}</p> }

                                <div>
                                    <p className="mb-0 mt-2">Have an account?
                                        <Link to="/signin" className="text-black-50 fw-bold ms-1">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>

                                <MDBBtn
                                    className='mx-2 mt-3 px-5 text-black'
                                    color='red'
                                    size='lg'
                                    style={{backgroundColor: '#a69c9c', fontWeight: '600'}}
                                    onClick={handleRegister}
                                >
                                    Register
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

export default Register;