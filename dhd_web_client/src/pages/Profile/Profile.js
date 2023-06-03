import {useContext, useEffect, useState} from "react";
import {AuthContext} from "~/context/AuthContext";
import {Button, Card, Col, Container, Form, Image, InputGroup, Row} from "react-bootstrap";
import api from "~/api/api";
import {MdEmail} from "react-icons/md";
import {FaPhoneAlt, FaUserEdit} from "react-icons/fa";

import classNames from "classnames/bind";
import styles from "./Profile.module.scss"
import {toast, ToastContainer} from "react-toastify";

const cx = classNames.bind(styles);

const Profile = () => {
    const {user, setUser, userImage, setUserImage} = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    // const handleImageChange = (e) => {
    //     setImage(e.target.files[0]);
    // };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        console.log('Name User', user.name);

        // Update the name state with the new value
        const updatedName = name;

        // Tạo một đối tượng FormData để gửi dữ liệu
        const formData = new FormData();
        formData.append("name", updatedName);
        formData.append("phone", phone);

        if (!updatedName || !phone ) {
            setErrorMessage('Please enter all information!');
            return;
        }

        try {
            console.log('User Id: ', user);
            console.log('User Id: ', user._id);

            const response = await api.put(`/edit-profile/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // const updatedUser = response.data;

            // Handle the updated user data here or close the modal
            setErrorMessage('');

            // Cập nhật lại thông tin người dùng trong AuthContext
            const updatedUser = { ...user, name, phone };
            setUser(updatedUser);
            setName(updatedUser.name);
            console.log("Updated User:", updatedUser.name);
            setPhone(updatedUser.phone);

            // setUserImage(updatedUser.image);

            toast.success('Cập nhật thông tin thành công!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

        } catch (err) {
            setErrorMessage('Đã xảy ra lỗi khi cập nhật thông tin.');
        }
    }

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
    }, [user]);

    return (
        <Container className={'mt-2'}>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6} className={cx('colWrapper')}>
                    <Card className={cx('wrapper')}>
                        <Card.Body className='mt-4 mb-4'>
                            {/*<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>*/}
                            {/*    <Image*/}
                            {/*        src={`${api.defaults.baseURL}/userImages/${userImage}`}*/}
                            {/*        alt="avatar"*/}
                            {/*        roundedCircle*/}
                            {/*        style={{width: "100px", height: "100px"}}*/}
                            {/*    />*/}
                            {/*    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />*/}
                            {/*    <Button className="mt-3 mb-3" onClick={() => document.querySelector('input[type="file"]').click()}>*/}
                            {/*        Thay đổi ảnh*/}
                            {/*    </Button>*/}
                            {/*    /!*<Button onClick={handleImageUpload}>Tải lên</Button>*!/*/}
                            {/*</div>*/}

                            <Form
                                className="border p-5 mt-2 d-flex flex-column align-items-center"
                                as="form"
                                style={{
                                    borderRadius: '12px', minWidth: '80%',
                                }}
                                onSubmit={handleUpdateProfile}
                            >
                                <Form.Group controlId="email" className="mb-3" required>
                                    <Form.Label className={cx('label-profile')}>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <MdEmail color="gray"/>
                                        </InputGroup.Text>
                                        <Form.Control type="email" disabled value={user.email}/>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="username" className="mb-3" required>
                                    <Form.Label className={cx('label-profile')}>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaUserEdit color="black"/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Add your username here"
                                            value={name}
                                            onChange={handleNameChange}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="phone" className="mb-3" required>
                                    <Form.Label className={cx('label-profile')}>Phone Number</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaPhoneAlt color="black"/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Add your phone here"
                                            pattern="[0-9]*"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="align-self-center mt-3"
                                >
                                    Update
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3}></Col>
            </Row>

            <ToastContainer />
        </Container>
    )

}

export default Profile;