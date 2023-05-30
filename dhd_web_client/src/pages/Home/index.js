import styles from './Home.module.scss'
import classNames from "classnames/bind"
import BreadcrumbExample from "~/pages/Home/BreadcrumbExample";
import ListProducts from "~/pages/Home/Products/Products";
import {ToastContainer} from "react-toastify";

const cx = classNames.bind(styles)

function Home() {
    return(
        <div className={cx('wrapper')}>
            <BreadcrumbExample />
            {/*<ListProducts />*/}

            <ToastContainer />
        </div>
    )
}

export default Home;