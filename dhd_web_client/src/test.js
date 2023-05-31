// import React, {useState} from "react";
// import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";
//
// const ResetPassword = () => {
//
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState("");
//
//     const [errorMessage, setErrorMessage] = useState('');
//
//     const handleResetPassword = async (e) => {
//         e.preventDefault();
//
//         if (!password || !confirmPassword) {
//             setErrorMessage("Xin hãy nhập mật khẩu!");
//             return;
//         }
//         if (password !== confirmPassword) {
//             setErrorMessage("Mật khẩu không khớp");
//             return;
//         }
//
//         try {
//
//
//
//         } catch (error) {
//                 setErrorMessage("Lỗi server");
//         }
//     }
//
//     return (
//         <div>
//             <MDBContainer>
//                 <MDBRow>
//                     <MDBCol col='12'>
//                         <MDBCard>
//                             <MDBCardBody>
//
//                                 <MDBInput
//                                     label={'mật khẩu mới'}
//                                     type='password'
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 <MDBInput
//                                     label={'Xác nhận mật khẩu mới'}
//                                     type='password'
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                 />
//
//                                 <input
//                                     type="hidden"
//                                     name="user_id"
//                                     value={user_id}
//                                 />
//
//                                 <MDBBtn onClick={handleResetPassword}>
//                                     Xác nhận
//                                 </MDBBtn>
//                             </MDBCardBody>
//                         </MDBCard>
//                     </MDBCol>
//                 </MDBRow>
//             </MDBContainer>
//         </div>
//     );
// }
//
// export default ResetPassword;