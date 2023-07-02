import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

import api from "~/api/api";
import classNames from "classnames/bind";
import styles from "./SearchMovies.module.scss";
import CircularProgressBarVote from "~/components/CircularProgressBar/CircularProgressBar";
import Button from "react-bootstrap/Button";

const cx = classNames.bind(styles);

const SearchMovies = () => {
    const [searchResult, setSearchResult] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("q");

    useEffect(() => {
        if (searchTerm) {
            api
                .get(`/movies/search?query=${searchTerm}`)
                .then((response) => {
                    setSearchResult(response.data);
                })
                .catch((err) => console.log(err.message));
        } else {
            setSearchResult([]);
        }
    }, [searchTerm]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("search-results")}>
                <h2>Kết quả tìm kiếm của: {searchTerm}</h2>
            </div>

            {searchResult.length > 0 ? (
                <div className={cx("card-movie")}>
                    <Row xs={1} md={2} lg={4} className="g-4 mb-10 mt-10">
                        {searchResult.map((movie) => (
                            <Col key={movie._id} className={cx("col-movie")}>
                                <Card className={cx("custom-card")}>
                                    <Card.Img
                                        variant="top"
                                        src={
                                            movie.poster_path.startsWith("/")
                                                ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                                                : movie.poster_path
                                        }
                                        className={cx("card-image")}
                                        // style={{width: '150px', height: '250px'}}
                                    />
                                    {movie.vote_average_user !== 0 && (
                                        <div className={cx("user-score")}>
                                            <CircularProgressBarVote
                                                value={movie.vote_average_user * 10}
                                                text={`${movie.vote_average_user * 10}%`}
                                                // className={cx('me-3', 'user-score-percent')}
                                            />
                                        </div>
                                    )}
                                    <Card.Body className="d-flex flex-column justify-content-between mt-2 mb-2">
                                        <NavLink to={`/movie/${movie._id}`}>
                                            <Card.Title className={cx("card-title")}>
                                                {movie.title}
                                            </Card.Title>
                                        </NavLink>
                                        <Card.Text className={cx("mb-4", "card-text")}>
                                            {movie.overview}
                                        </Card.Text>
                                        <div className="text-center">
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
                </div>
            ) : (
                <h1 className={cx('not-found')}>Không tìm thấy</h1>
            )}
        </div>
    );
};

export default SearchMovies;
