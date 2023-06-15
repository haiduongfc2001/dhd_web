import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import styles from './Home.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function BreadcrumbExample({movie}) {
    return (
        <>
            {
                movie ? (
                    <Breadcrumb className={cx('breadcrumb')}>
                        <Breadcrumb.Item href="/">
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            href="/"
                            active
                        >
                            Movie
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            href="/"
                            active
                        >
                            {movie.title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                ) : (
                    <Breadcrumb className={cx('breadcrumb')}>
                        <Breadcrumb.Item href="/">
                            Home
                        </Breadcrumb.Item>
                    </Breadcrumb>
                )
            }
        </>
    )
}

export default BreadcrumbExample;