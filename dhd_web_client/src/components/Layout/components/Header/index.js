import classNames from "classnames/bind";
import styles from "./Header.module.scss"
import Tippy from '@tippyjs/react/headless';
import logoDHD from "~/assets/images/logo_dhdadmin.png"
import {BiBell} from "react-icons/bi";
import {FiLogIn, FiLogOut} from "react-icons/fi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faMagnifyingGlass, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import DigitClock from "~/components/Layout/components/DigitClock/DigitClock";
import {Link, NavLink, useNavigate} from "react-router-dom";
import api from "~/api/api";
import {AuthContext} from "~/context/AuthContext";
import {MDBBtn, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle} from "mdb-react-ui-kit";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Image, SplitButton} from "react-bootstrap";

const cx = classNames.bind(styles)

function Header(props) {
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    const {isLoggedIn, setIsLoggedIn, user} = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // useEffect(() => {
    //     if (user.id)
    // })


    // useEffect(() => {
    //     // Check if user object exists in local storage
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, [setUser]);
    //
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         const parsedUser = JSON.parse(storedUser);
    //         setUserImage(parsedUser.image);
    //     }
    // }, []);


    const handleLogout = async () => {
        try {
            await api.get('/logout');

            // Xóa token trong localStorage (hoặc sessionStorage)
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');

            navigate('/login'); // Chuyển hướng đến trang đăng nhập
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <NavLink to='/'>
                    <img
                        src={logoDHD}
                        alt="logo dhd"
                        className={cx('logo-admin')}
                    />
                </NavLink>
                <Tippy
                    visible={searchResult.length > 0}
                    render={attrs => (
                        <div className={cx('search-results')} tabIndex={-1} {...attrs}>
                            Kết quả
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            placeholder="Search ..."
                            spellCheck={false}
                        />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark}/>
                        </button>
                        {/*Loading*/}
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </Tippy>

                {user.image !== undefined && (
                    <MDBDropdown className='btn-group shadow-0'>
                        <div className='me-3'>
                            <Image
                                src={`${api.defaults.baseURL}/userImages/${user.image}`}
                                alt="avatar"
                                roundedCircle
                                style={{ width: "45px", height: "45px" }}
                                className="me-3"
                            />
                            <p className='text-black-150 mb-0'>{user.email}</p>
                        </div>
                        <MDBDropdownToggle split></MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem className='ms-3 mt-2 mb-2'>
                                <Link to="/profile" className="dropdown-link">
                                    Hồ sơ
                                </Link>
                            </MDBDropdownItem>
                            <MDBDropdownItem
                                className='ms-3 mb-2'
                                style={{cursor: 'pointer'}}
                                onClick={handleLogout}
                            >
                                <Link to={''}>
                                    Đăng xuất
                                </Link>
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                )}

                <div>
                    {/*<DigitClock />*/}
                    <BiBell className={cx('icon-bell')}/>
                    <div className={cx('ms-3 logout-container')}>
                        {isLoggedIn === true
                            ? (
                                <Button
                                    className={cx('logout')}
                                    size={'lg'}
                                    onClick={handleLogout}
                                >
                                    <div className="logout-content">
                                        <FiLogOut className={cx('icon-logout')}/>
                                        <span className={cx('logout-text')}>
                                            Đăng xuất
                                        </span>
                                    </div>
                                </Button>
                            ) : (
                                <NavLink to={'/login'}>
                                    <Button
                                        className={cx('login')}
                                        size={'lg'}
                                    >
                                        <div className="login-content">
                                            <FiLogIn className={cx('icon-login')}/>
                                            <span className={cx('login-text')}>
                                                Đăng nhập
                                            </span>
                                        </div>
                                    </Button>
                                </NavLink>
                            )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;