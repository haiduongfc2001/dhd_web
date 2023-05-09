import React from 'react';
import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";
import Authentication from "~/components/Authentication/Authentication";
import {MDBBtn, MDBCheckbox, MDBContainer, MDBIcon, MDBInput, MDBTabsContent, MDBTabsPane} from "mdb-react-ui-kit";

const cx = classNames.bind(styles)

function SignIn() {

    return (
        <div className={cx('wrapper')}>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <Authentication />
                <MDBTabsContent>
                    <MDBTabsPane>
                        <div className="text-center mb-3">
                            <p>Sign in with:</p>
                            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='facebook' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='twitter' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='google' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='github' size="sm"/>
                                </MDBBtn>
                            </div>
                            <p className="text-center mt-3">or:</p>
                        </div>

                        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="/">Forgot password?</a>
                        </div>

                        <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                        <p className="text-center">Not a member? <a href="/">Register</a></p>

                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
        </div>
    );
}

export default SignIn;