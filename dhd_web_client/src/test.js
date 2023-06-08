// import React, {useState} from 'react';
// import {
//     MDBBtn,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBCard,
//     MDBCardBody,
//     MDBInput
// }
//     from 'mdb-react-ui-kit';
// import usePasswordToggle from "~/hooks/usePasswordToggle";
// import api from "~/api/api";
//
// function Register() {
//
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [repeatPassword, setRepeatPassword] = useState('');
//
//     const [errorMessage, setErrorMessage] = useState('');
//
//     const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle();
//
//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };
//
//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };
//
//     const handleRepeatPasswordChange = (e) => {
//         setRepeatPassword(e.target.value);
//     };
//
//     const handleRegister = async (event) => {
//         event.preventDefault();
//
//         // Kiểm tra xem đã nhập đầy đủ thông tin như name, email, name, password và ảnh đại diện chưa
//         if (!email || !password || !repeatPassword ) {
//             setErrorMessage('Xin nhập đầy đủ thông tin!');
//             return;
//         }
//
//         if (repeatPassword !== password) {
//             setErrorMessage('Nhập lại mật khẩu không đúng!');
//             return;
//         }
//
//         // Tạo formData để gửi dữ liệu và file
//         const formData = new FormData();
//         formData.append('email', email);
//         formData.append('password', password);
//
//         try {
//             const response = await api.post('/register', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     const formRegisterArray = [
//         {
//             id: 'email',
//             type: 'email',
//             label: 'Your Email',
//             value: email,
//             onChange: handleEmailChange,
//         },
//         {
//             id: 'password',
//             type: PasswordInputType,
//             label: 'Your Password',
//             value: password,
//             onChange: handlePasswordChange,
//         },
//         {
//             id: 'repeat-password',
//             type: PasswordInputType,
//             label: 'Repeat Your Password',
//             value: repeatPassword,
//             onChange: handleRepeatPasswordChange,
//         },
//     ]
//
//     return (
//         <MDBContainer>
//             <MDBRow>
//                 <MDBCol col='12'>
//                     <MDBCard>
//                         <MDBCardBody>
//
//                             {formRegisterArray.map((form, index) => (
//                                 <MDBInput
//                                     key={index}
//                                     type={form.type}
//                                     id={form.id}
//                                     label={form.label}
//                                     value={form.value}
//                                     onChange={form.onChange}
//                                 >
//                                     {form.id === 'password' && password && (
//                                         <span onClick={toggleVisibility}>
//                                                 {ToggleIcon}
//                                             </span>
//                                     )}
//                                 </MDBInput>
//                             ))}
//
//                             <MDBBtn onClick={handleRegister}>
//                                 Register
//                             </MDBBtn>
//                         </MDBCardBody>
//
//                     </MDBCard>
//                 </MDBCol>
//             </MDBRow>
//         </MDBContainer>
//     );
// }
//
// export default Register;