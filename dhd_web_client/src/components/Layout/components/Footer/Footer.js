import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {

    return (
        <footer className={cx("footer")}>
            <div className={cx("container")}>
                <p className={cx("copyright", "me-3")}>
                    2023
                    <h2 className={'ms-2'}>DHD</h2>
                </p>
                <div className={cx("contact-info")}>
                    <p>Email: haiduongfc2001@gmail.com</p>
                    <p>Phone: +84 123-456-789</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;