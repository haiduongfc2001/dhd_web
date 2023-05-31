import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";

import classNames from "classnames/bind";
import styles from "./Authentication.module.scss";
import api from "~/api/api";

const cx = classNames.bind(styles)

const EmailVerified = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id');
        api.get(`/verify?id=${id}`)
            .then(response => {
                console.log('Email verified successfully!');
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
                        <MDBCard className='bg-light text-black my-5 mx-auto'
                                 style={{borderRadius: '1rem', maxWidth: '400px'}}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                                <h2>
                                    Xác thực tài khoản thành công!
                                </h2>

                                <NavLink to={'/login'}>
                                    <MDBBtn
                                        className='mx-2 mt-4 px-5 text-black'
                                        color='red'
                                        size='lg'
                                        style={{backgroundColor: '#a69c9c', fontWeight: '600'}}
                                    >
                                        Log in
                                    </MDBBtn>
                                </NavLink>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default EmailVerified;