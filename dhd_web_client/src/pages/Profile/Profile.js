import {useContext, useEffect, useState} from "react";
import {AuthContext} from "~/context/AuthContext";
import {Button, Card, Col, Container, Form, Image, InputGroup, Row, Stack} from "react-bootstrap";
import api from "~/api/api";
import {MdEmail} from "react-icons/md";
import {FaPhoneAlt, FaUserEdit} from "react-icons/fa";
import {AiFillPhone} from "react-icons/ai";

import classNames from "classnames/bind";
import styles from "./Profile.module.scss"

const cx = classNames.bind(styles);

const Profile = () => {
    const {user, userImage, setUserImage} = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);

    return (
        <Container className={'mt-2'}>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6} className={cx('colWrapper')}>
                    <Card className={cx('wrapper')}>
                        <Card.Body className='mt-4 mb-4'>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Image
                                    src={`${api.defaults.baseURL}/userImages/${userImage}`}
                                    alt="avatar"
                                    roundedCircle
                                    style={{width: "100px", height: "100px"}}
                                />
                                <Button className={'mt-3 mb-3'}>
                                    Thay đổi ảnh
                                </Button>
                            </div>

                            <Form
                                className="border p-5 mt-2"
                                as="form"
                                style={{
                                    borderRadius: '12px', minWidth: '80%',
                            }}
                            >
                                <Form.Group controlId="email" className="mb-3" required>
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <MdEmail color="gray"/>
                                        </InputGroup.Text>
                                        <Form.Control type="email" disabled value={user.email}/>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="username" className="mb-3" required>
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaUserEdit color="black"/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Add your username here"
                                            value={user.name}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="phone" className="mb-3" required>
                                    <Form.Label>Phone Number</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaPhoneAlt color="black"/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Add your phone here"
                                            pattern="[0-9]*"
                                            value={user.phone}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form>

                            {/*<div className={cx('info-user')}>*/}
                            {/*    <Card.Title>{user.name}</Card.Title>*/}
                            {/*    <Card.Text>*/}
                            {/*        <strong>Email:</strong> {user.email}*/}
                            {/*    </Card.Text>*/}
                            {/*    <Card.Text>*/}
                            {/*        <strong>Phone:</strong> {user.phone}*/}
                            {/*    </Card.Text>*/}
                            {/*</div>*/}

                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </Container>
    )

}

export default Profile;