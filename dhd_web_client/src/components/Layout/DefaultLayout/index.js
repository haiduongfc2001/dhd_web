import Sidebar from "./Sidebar";
import Header from "~/components/Layout/components/Header";
import {ToastContainer} from "react-toastify";
import {Container, Row} from "react-bootstrap";

import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"
const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        // <div className={cx('wrapper')}>
        //     <Header/>
        //     <div className={cx('container')}>
        //         {/*<Sidebar/>*/}
        //         <div className={cx('content')}>
        //             {children}
        //         </div>
        //     </div>
        //
        //     {/*<ToastContainer />*/}
        // </div>

        <Container>
            <Row>
                <Header/>
            </Row>
            <Row className={cx('content')}>
                {children}
            </Row>
        </Container>

    )
}

export default DefaultLayout;