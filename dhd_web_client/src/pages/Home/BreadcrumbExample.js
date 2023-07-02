import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import styles from './Home.module.scss'
import classNames from "classnames/bind";
import {NavLink, useNavigate} from "react-router-dom";

const cx = classNames.bind(styles)

function BreadcrumbExample({movie}) {
    const navigate = useNavigate()
    const returnHome = () => {
        navigate('/')
    }

    return (
        <>
            <Breadcrumb className={cx("breadcrumb")}>
                <Breadcrumb.Item>
                    <div onClick={returnHome}>Home</div>
                    {/*<NavLink to="/">Home</NavLink>*/}
                </Breadcrumb.Item>
                {movie ? (
                    <>
                        <Breadcrumb.Item active>Movie</Breadcrumb.Item>
                        <Breadcrumb.Item active>{movie.title}</Breadcrumb.Item>
                    </>
                ) : null}
            </Breadcrumb>
        </>
    )
}

export default BreadcrumbExample;