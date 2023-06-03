// import {useContext, useEffect, useState} from "react";
// import {AuthContext} from "~/context/AuthContext";
// import {Button, Form, InputGroup} from "react-bootstrap";
// import api from "~/api/api";
//
// const Profile = () => {
//     const {user, setUser} = useContext(AuthContext);
//
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//
//     const handleNameChange = (e) => {
//         setName(e.target.value);
//     };
//
//     const handlePhoneChange = (e) => {
//         setPhone(e.target.value);
//     };
//
//     const handleUpdateProfile = async (e) => {
//         e.preventDefault();
//
//         console.log('Name User', user.name);
//
//         // Update the name state with the new value
//         const updatedName = name;
//
//         // Tạo một đối tượng FormData để gửi dữ liệu
//         const formData = new FormData();
//         formData.append("name", updatedName);
//         formData.append("phone", phone);
//
//         try {
//             console.log('User Id: ', user._id);
//
//             const response = await api.put(`/edit-profile/${user._id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//
//             // Cập nhật lại thông tin người dùng trong AuthContext
//             const updatedUser = { ...user, name, phone };
//             setUser(updatedUser);
//             setName(updatedUser.name);
//             console.log("Updated User:", updatedUser.name);
//             setPhone(updatedUser.phone);
//         } catch (err) {
//             console.log(err.message);
//         }
//     }
//
//     useEffect(() => {
//         setName(user.name);
//         setEmail(user.email);
//         setPhone(user.phone);
//     }, [user]);
//
//     return (
//         <Form as="form"
//             onSubmit={handleUpdateProfile}
//         >
//             <Form.Group controlId="email" className="mb-3" required>
//                 <Form.Label>Email</Form.Label>
//                 <InputGroup>
//                     <Form.Control type="email" disabled value={user.email}/>
//                 </InputGroup>
//             </Form.Group>
//
//             <Form.Group controlId="username" className="mb-3" required>
//                 <Form.Label>Username</Form.Label>
//                 <InputGroup>
//                     <Form.Control
//                         type="text"
//                         placeholder="Add your username here"
//                         value={user.name}
//                         onChange={handleNameChange}
//                     />
//                 </InputGroup>
//             </Form.Group>
//
//             <Form.Group controlId="phone" className="mb-3" required>
//                 <Form.Label>Phone Number</Form.Label>
//                 <InputGroup>
//                     <Form.Control
//                         type="text"
//                         placeholder="Add your phone here"
//                         value={phone}
//                         onChange={handlePhoneChange}
//                     />
//                 </InputGroup>
//             </Form.Group>
//
//             <Button
//                 variant="primary"
//                 type="submit"
//             >
//                 Update
//             </Button>
//         </Form>
//     )
//
// }
//
// export default Profile;