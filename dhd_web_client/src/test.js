import {useContext, useEffect, useState} from "react";
import {AuthContext} from "~/context/AuthContext";
import {Button, Form, InputGroup} from "react-bootstrap";
import api from "~/api/api";
import {MdEmail} from "react-icons/md";

const Profile = () => {
    const {user, setUser} = useContext(AuthContext);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!name || !phone) {
            setErrorMessage('Please enter all information!');
            return;
        }

        const updatedUser = { ...user, name, phone };

        try {
            const response = await api.put(`/edit-profile/${user._id}`, updatedUser);

            // Cập nhật thông tin người dùng trong state và cơ sở dữ liệu
            setUser(updatedUser);
            setErrorMessage('');

        } catch (err) {
            setErrorMessage('Đã xảy ra lỗi khi cập nhật thông tin.');
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setPhone(user.phone);
        }
    }, [user]);


    return (
        <Form
            as="form"
            onSubmit={handleUpdateProfile}
        >
            <Form.Group controlId="email" required>
                <Form.Label>Email</Form.Label>
                <InputGroup>
                    <Form.Control type="email" disabled value={user.email}/>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="username" required>
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Add your username here"
                        value={name}
                        onChange={handleNameChange}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="phone" required>
                <Form.Label>Phone Number</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Add your phone here"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </InputGroup>
            </Form.Group>

            <Button type="submit">
                Update
            </Button>
        </Form>
    )

}

export default Profile;