import styles from './Home.module.scss'
import classNames from "classnames/bind"
import BreadcrumbExample from "~/pages/Home/BreadcrumbExample";
import ListProducts from "~/pages/Home/Products/Products";
import {ToastContainer} from "react-toastify";
import {AuthContext} from "~/context/AuthContext";
import {useContext, useEffect, useState} from "react";
import api from "~/api/api";

const cx = classNames.bind(styles)

function Home() {

    return (
        <div className={cx('wrapper')}>
            {/*<BreadcrumbExample />*/}
            {/*<ListProducts />*/}
            Home
            <ToastContainer/>
        </div>
    )
}

export default Home;