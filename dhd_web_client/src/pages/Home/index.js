import {ToastContainer} from "react-toastify";
import {AuthContext} from "~/context/AuthContext";
import {useContext, useEffect, useState,} from "react";
import {Card, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

import styles from './Home.module.scss'
import classNames from "classnames/bind"
import api from "~/api/api";

const cx = classNames.bind(styles)

function Home() {
    const {user} = useContext(AuthContext);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get('/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(err => console.log(err.message));
    })

    return (
        <div className={cx('wrapper')}>
            {/*<BreadcrumbExample />*/}
            Home

            <br/>
            <span>
                Username: {user.name}
            </span>

            <div className={cx("card-movies")}>
                <Row xs={1} md={2} lg={4} className="g-4 mb-10 mt-10">
                    {movies.map((movie) => (
                        <Col key={movie._id}>
                            <Card >
                                <Card.Img
                                    variant="top"
                                    src={
                                        movie.poster_path.startsWith("/")
                                            ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                                            : movie.poster_path
                                    }
                                    // style={{width: '150px', height: '250px'}}
                                />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title
                                        style={{fontSize: '30px'}}
                                    >
                                        {movie.title}
                                    </Card.Title>
                                    <Card.Text
                                        style={{
                                            maxHeight: "6em",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            "-webkit-line-clamp": "3",
                                            "-webkit-box-orient": "vertical",
                                        }}
                                    >
                                        {movie.overview}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                    >
                                        Rate
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <ToastContainer/>
        </div>
    )
}

export default Home;