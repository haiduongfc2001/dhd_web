import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"
import Sidebar from "./Sidebar";
import Header from "~/components/Layout/components/Header";
import {ToastContainer} from "react-toastify";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx('container')}>
                {/*<Sidebar/>*/}
                <div className={cx('content')}>
                    {children}
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default DefaultLayout;