import React, { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "~/context/AuthContext";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import api from "~/api/api";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaUserEdit } from "react-icons/fa";

import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { toast, ToastContainer } from "react-toastify";

const cx = classNames.bind(styles);

const Profile = () => {
  const { user, setUser, userImage, setUserImage } = useContext(AuthContext);

  // const [email, setEmail] = useState(user.email);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const inputRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageUpload = async () => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      await api.put(`/edit-profile/${user._id}/image`, formData);

      await api.get(`/user/${user._id}`).then((response) => {
        setUser(response.data);
      });
      setIsImageUpdated(true);
      setImageName(""); // Xóa tên ảnh sau khi cập nhật thành công
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    console.log("Name User", user.name);

    // // Tạo một đối tượng FormData để gửi dữ liệu
    // const formData = new FormData();
    // formData.append("name", updatedName);
    // formData.append("phone", phone);

    if (!name || !phone) {
      setErrorMessage("Please enter all information!");
      return;
    }

    // Tạo một đối tượng mới từ thông tin người dùng hiện tại và dữ liệu cập nhật
    const updatedUser = { ...user, name, phone };

    try {
      console.log("User Id: ", user);
      console.log("User Id: ", user._id);

      const response = await api.put(`/edit-profile/${user._id}`, updatedUser);

      // Cập nhật thông tin người dùng trong state và cơ sở dữ liệu
      setUser(updatedUser);

      // const updatedUser = response.data;

      // Handle the updated user data here or close the modal
      setErrorMessage("");

      console.log("Updated User:", updatedUser.name);
      console.log("Updated User:", updatedUser.phone);

      // setUserImage(updatedUser.image);

      toast.success("Cập nhật thông tin thành công!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      setErrorMessage("Đã xảy ra lỗi khi cập nhật thông tin.");
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setIsImageUpdated(false); // Reset trạng thái isImageUpdated khi component được render lại
    }
  }, [user]);

  return (
    <Container className={"mt-2"}>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6} className={cx("colWrapper")}>
          <Card className={cx("wrapper")}>
            <Card.Body className="mt-4 mb-4">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {user.image ? (
                  <Image
                    src={`${api.defaults.baseURL}/userImages/${user.image}`}
                    alt="avatar"
                    roundedCircle
                    style={{ width: "120px", height: "120px" }}
                  />
                ) : (
                  <div>
                    <Image
                      src={
                        "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
                      }
                      alt="avatar"
                      roundedCircle
                      style={{ width: "120px", height: "120px" }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  ref={inputRef}
                />
                {!isImageUpdated &&
                  imageName && ( // Hiển thị tên ảnh khi đã được chọn
                    <p
                      className="mb-1 mt-2"
                      style={{
                        padding: "3px",
                        border: "2px solid black",
                        borderRadius: "8px",
                        backgroundColor: "#ededed",
                      }}
                    >
                      {imageName}
                    </p>
                  )}
                <div className="d-flex mt-3 mb-3 justify-content-center align-items-center">
                  <Button className="me-1" onClick={handleButtonClick}>
                    Thay đổi ảnh
                  </Button>
                  <Button className="ms-1" onClick={handleImageUpload}>
                    Cập nhật ảnh
                  </Button>
                </div>
              </div>

              <Form
                className="border p-5 mt-2 d-flex flex-column align-items-center"
                as="form"
                style={{
                  borderRadius: "12px",
                  minWidth: "80%",
                }}
                onSubmit={handleUpdateProfile}
              >
                <Form.Group controlId="email" className="mb-3" required>
                  <Form.Label className={cx("label-profile")}>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <MdEmail color="gray" />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      disabled
                      value={user.email || ""}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="username" className="mb-3" required>
                  <Form.Label className={cx("label-profile")}>
                    Username
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUserEdit color="black" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Add your username here"
                      value={name || ""}
                      onChange={handleNameChange}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="phone" className="mb-3" required>
                  <Form.Label className={cx("label-profile")}>
                    Phone Number
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaPhoneAlt color="black" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Add your phone here"
                      pattern="[0-9]*"
                      value={phone || ""}
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
  );
};

export default Profile;
