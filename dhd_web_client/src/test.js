// import React, {useState} from "react";
// import {ToastContainer} from "react-toastify";
// import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";
//
// const ForgotPassword = () => {
//
//     const [email, setEmail] = useState('');
//
//     const [errorMessage, setErrorMessage] = useState('');
//     const [notificationMessage, setNotificationMessage] = useState('');
//
//     const handleSubmit = async () => {
//         try {
//
//         } catch (err) {
//
//         }
//     }
//
//     return (
//         <div>
//             <MDBContainer fluid>
//                 <MDBRow>
//                     <MDBCol col='12'>
//                         <MDBCard>
//                             <MDBCardBody>
//                                 <MDBInput
//                                     label='Email address'
//                                     type='email'
//                                     autoFocus
//                                     autoComplete='off'
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//
//                                 {errorMessage && <p className={'text-danger'}>{errorMessage}</p>}
//                                 {notificationMessage && <p className={'text-danger'}>{notificationMessage}</p>}
//
//                                 <MDBBtn onClick={handleSubmit}>
//                                     Gửi mail
//                                 </MDBBtn>
//                             </MDBCardBody>
//                         </MDBCard>
//                     </MDBCol>
//                 </MDBRow>
//             </MDBContainer>
//
//             <ToastContainer/>
//         </div>
//     );
// }
//
// export default ForgotPassword;