import React, {useState} from 'react';
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
import logoDHD from "~/assets/images/logo_dhdadmin.png";
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import usePasswordToggle from "~/hooks/usePasswordToggle";
import api from "~/api/api";

import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import Header from "~/components/Layout/components/Header";
const cx = classNames.bind(styles)

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [image, setImage] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const [PasswordInputType, PasswordToggleIcon, togglePasswordVisibility] = usePasswordToggle();
    const [RepeatPasswordInputType, RepeatPasswordToggleIcon, toggleRepeatPasswordVisibility] = usePasswordToggle();

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

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        // Kiểm tra xem đã nhập đầy đủ thông tin như name, email, name, password và ảnh đại diện chưa
        if (!name || !email || !password || !phone || !image) {
            setErrorMessage('Xin nhập đầy đủ thông tin!');
            return;
        }

        if (repeatPassword !== password) {
            setErrorMessage('Nhập lại mật khẩu không đúng!');
            return;
        }

        // Tạo formData để gửi dữ liệu và file
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('image', image);

        try {
            const response = await api.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setErrorMessage(response.data.message);

            // navigate('/');

            // setName('');
            // setEmail('');
            // setPhone('');
            // setPassword('');
            // setImage(null);
            setErrorMessage('');
            setNotificationMessage(response.data.message);
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
                    Tên của bạn{" "}
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
                    Email{" "}
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
                    Số điện thoại{" "}
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
                    Mật khẩu{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            value: password,
            onChange: handlePasswordChange,
            toggleVisibility: togglePasswordVisibility,
            toggleIcon: PasswordToggleIcon,
        },
        {
            id: 'repeat-password',
            type: RepeatPasswordInputType,
            label: (
                <>
                    Nhập lại mật khẩu{" "}
                    <span
                        style={{color: "red"}}
                        dangerouslySetInnerHTML={{__html: "*"}}
                    />
                </>
            ),
            value: repeatPassword,
            onChange: handleRepeatPasswordChange,
            toggleVisibility: toggleRepeatPasswordVisibility,
            toggleIcon: RepeatPasswordToggleIcon,
        },
        {
            id: 'image',
            type: 'file',
            label: (
                <>
                    Ảnh đại diện{" "}
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
            <Header />

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
                                <p className="text-black-150 mt-3 mb-3">
                                    Đăng ký tài khoản!
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
                                        {((form.id === 'password' && password) || (form.id === 'repeat-password' && repeatPassword)) && (
                                            <span
                                                className={cx('password-toggle-icon')}
                                                onClick={form.toggleVisibility}
                                            >
                                                {form.toggleIcon}
                                            </span>
                                        )}

                                    </MDBInput>
                                ))}

                                {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}
                                {notificationMessage && <p className={'text-danger'}>{notificationMessage}</p>}

                                <div>
                                    <p className="mb-0 mt-2">Bạn đã có tài khoản?
                                        <Link to="/login" className="text-black-50 fw-bold ms-1">
                                            Đăng nhập
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
                                    Đăng ký
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