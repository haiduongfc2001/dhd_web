import {ToastContainer} from "react-toastify";
import {AuthContext} from "~/context/AuthContext";
import {useContext, useEffect, useState,} from "react";
import {Card, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

import api from "~/api/api";
import {NavLink, useNavigate} from "react-router-dom";

import styles from './Home.module.scss'
import classNames from "classnames/bind"
import BreadcrumbExample from "~/pages/Home/BreadcrumbExample";
import CircularProgressBarVote from "~/components/CircularProgressBar/CircularProgressBar";
import {CircularProgressbar} from "react-circular-progressbar";
import convertMovieTitle from "~/hooks/convertMovieTitle";
import ControlledCarousel from "~/components/ControlledCarousel/ControlledCarousel";

const cx = classNames.bind(styles)

function Home() {
    const navigate = useNavigate();
    const {user, setUser, isLoggedIn} = useContext(AuthContext);

    const [movies, setMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState(8); // Số phim hiển thị ban đầu

    useEffect(() => {
        console.log(isLoggedIn);
        api.get('/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(err => console.log(err.message));
    }, [isLoggedIn, setMovies]);

    const handleLoadMore = () => {
        // Tăng số lượng phim hiển thị khi nhấp vào nút "Xem thêm"
        setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 8);
    }


    // const handleMovieInfo = async (movie) => {
    //     try {
    //
    //         console.log(movie._id);
    //
    //         const response = await api.get(`/movie/${movie._id}`);
    //
    //         const movieInfo = response.data;
    //         console.log(movieInfo);
    //
    //         navigate(`movie/${movie._id}`);
    //
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }

    return (
        <div className={cx('wrapper')}>
            <BreadcrumbExample/>
            {/*Home*/}

            {/*<br/>*/}
            {/*<span>*/}
            {/*    Username: {user.name}*/}
            {/*</span>*/}


            <ControlledCarousel />

            <div className={cx("card-movie")}>
                <Row xs={1} md={2} lg={4} className="g-4 mb-10 mt-10">
                    {movies
                        .slice(0, visibleMovies)
                        .map((movie) => (
                        <Col key={movie._id} className={cx('col-movie')}>
                            <Card className={cx('custom-card')}>
                                <Card.Img
                                    variant="top"
                                    src={
                                        movie.poster_path.startsWith("/")
                                            ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                                            : movie.poster_path
                                    }
                                    className={cx('card-image')}
                                    // style={{width: '150px', height: '250px'}}
                                />
                                {
                                    movie.vote_average_user !== 0 && (
                                        <div className={cx('user-score')}>
                                            <CircularProgressBarVote
                                                value={(movie.vote_average_user * 10)}
                                                text={`${(movie.vote_average_user * 10)}%`}
                                                // className={cx('me-3', 'user-score-percent')}
                                            />
                                        </div>
                                    )
                                }
                                <Card.Body className="d-flex flex-column justify-content-between mt-2 mb-2">
                                    <NavLink to={`/movie/${movie._id}`}>
                                        <Card.Title
                                            className={cx('card-title')}
                                        >
                                            {movie.title}
                                        </Card.Title>
                                    </NavLink>
                                    <Card.Text
                                        className={cx('mb-4', 'card-text')}
                                    >
                                        {movie.overview}
                                    </Card.Text>
                                    <div className="text-center"> {/* Add this wrapper div */}
                                        <NavLink to={`/movie/${movie._id}`}>
                                            <Button variant="primary" size="lg">
                                                Xem chi tiết
                                            </Button>
                                        </NavLink>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {
                    visibleMovies < movies.length && (
                        <div className="text-center">
                            <Button
                                className={cx('load-more')}
                                    onClick={handleLoadMore}
                                size={"lg"}
                            >
                                Xem thêm
                            </Button>
                        </div>
                    )
                }
            </div>

            <ToastContainer/>
        </div>
    )
}

export default Home;