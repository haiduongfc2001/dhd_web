import Tippy from '@tippyjs/react/headless';
import logoDHD from "~/assets/images/logo_dhdadmin.png"
import {FiLogIn, FiLogOut} from "react-icons/fi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faMagnifyingGlass, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Link, NavLink, useNavigate} from "react-router-dom";
import api from "~/api/api";
import {AuthContext} from "~/context/AuthContext";
import {MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle} from "mdb-react-ui-kit";
import {Image} from "react-bootstrap";

import classNames from "classnames/bind";
import styles from "./Header.module.scss"
const cx = classNames.bind(styles)

function Header(props) {
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    const {isLoggedIn, setIsLoggedIn, user} = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    });

    // useEffect(() => {
    //     if (user.id)
    // })


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

                {/*<ul>*/}
                {/*    <li>*/}
                {/*        <NavLink className={cx('navbar-a')} to={'/'}>Home</NavLink>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <NavLink className={cx('navbar-a')} to={'/'}>About</NavLink>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <NavLink className={cx('navbar-a')} to={'/'}>News</NavLink>*/}
                {/*    </li>*/}
                {/*</ul>*/}

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

                {( user.image !== undefined && isLoggedIn === true ) && (
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
                    {/*<BiBell className={cx('icon-bell')}/>*/}
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