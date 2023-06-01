// import classNames from "classnames/bind";
// import styles from "./Header.module.scss"
// import Tippy from '@tippyjs/react/headless';
// import logoDHD from "~/assets/images/logo_dhdadmin.png"
// import {BiBell} from "react-icons/bi";
// import {FiLogIn, FiLogOut} from "react-icons/fi";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faCircleXmark, faMagnifyingGlass, faSpinner} from "@fortawesome/free-solid-svg-icons";
// import {useContext, useEffect, useState} from "react";
// import Button from "react-bootstrap/Button";
// import DigitClock from "~/components/Layout/components/DigitClock/DigitClock";
// import {NavLink, useNavigate} from "react-router-dom";
// import api from "~/api/api";
// import {AuthContext} from "~/context/AuthContext";
//
// const cx = classNames.bind(styles)
//
// function Header(props) {
//     const [searchResult, setSearchResult] = useState([]);
//     const navigate = useNavigate();
//
//     const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);
//
//     const { user } = useContext(AuthContext);
//
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsLoggedIn(true);
//         }
//     }, []);
//
//     useEffect(() => {
//         api.get('/user/:_id')
//             .then((response) => {
//                 setUser(response.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     })
//
//     return (
//         <header>
//             <div>
//                 <div>
//                     <img
//                         src={`${api.defaults.baseURL}/userImages/${user.image}`}
//                         alt="{user.name}"
//                         className='rounded-circle'
//                     />
//                     <p>{user.email}</p>
//                 </div>
//             </div>
//         </header>
//     )
// }
//
// export default Header;