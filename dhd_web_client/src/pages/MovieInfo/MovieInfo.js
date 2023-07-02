import {useContext, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import api from "~/api/api";
import Button from "react-bootstrap/Button";

import getReleaseYear from "~/hooks/getReleaseYear";
import formatReleaseDate from "~/hooks/formatReleaseDate";
import CircularProgressBarVote from "~/components/CircularProgressBar/CircularProgressBar";
import {AiFillStar} from "react-icons/ai";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {AuthContext} from "~/context/AuthContext";

import classNames from "classnames/bind";
import styles from "./MovieInfo.module.scss";
import {toast, ToastContainer} from "react-toastify";
import BreadcrumbExample from "~/pages/Home/BreadcrumbExample";
import {Card, Col, Row} from "react-bootstrap";

const cx = classNames.bind(styles);

function MovieInfo() {
    const {_id} = useParams();
    const [movie, setMovie] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [featuredMovies, setFeaturedMovies] = useState([]);

    useEffect(() => {
        api.get('/movies')
            .then(response => {
                const sortedMovies = response.data.sort((a, b) => b.vote_average_user - a.vote_average_user);
                const top4Movies = sortedMovies.slice(0, 4);
                setFeaturedMovies(top4Movies);
            })
    }, [setFeaturedMovies]);

    const {user, isLoggedIn} = useContext(AuthContext);

    const fetchMovie = async () => {
        try {
            const response = await api.get(`/movie/${_id}`);
            const movieData = response.data;
            setMovie(movieData);

            if (movieData && user) {
                const ratingUser = movieData.ratings.find(
                    (rating) => String(rating.user) === user._id
                );
                if (ratingUser) {
                    setUserRating(ratingUser.rating);
                    const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {}; // Lấy giá trị userRatings từ localStorage, nếu không có thì tạo một đối tượng mới
                    userRatings[_id] = ratingUser.rating; // Lưu giá trị rating vào đối tượng userRatings dựa trên khóa định danh của phim
                    localStorage.setItem("userRatings", JSON.stringify(userRatings)); // Cập nhật lại giá trị userRatings trong localStorage
                } else {
                    const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {}; // Lấy giá trị userRatings từ localStorage, nếu không có thì tạo một đối tượng mới
                    const storedRating = userRatings[_id]; // Lấy giá trị rating từ đối tượng userRatings dựa trên khóa định danh của phim
                    if (storedRating) {
                        setUserRating(parseFloat(storedRating));
                    } else {
                        setUserRating(0);
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [_id, fetchMovie, user]);

    const ratingChanged = async (newRating) => {
        try {

            if (isLoggedIn) {
                console.log(isLoggedIn);
                setUserRating(newRating);

                const ratingData = {
                    rating: newRating,
                    userId: user._id,
                };

                const response = await api.post(`/movie/${_id}/rating`, ratingData);
                setUserRating(response.data.rating);

                // Lấy giá trị userRatings từ localStorage, nếu không có thì tạo một đối tượng mới
                const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
                // Cập nhật giá trị rating vào đối tượng userRatings dựa trên khóa định danh của phim
                userRatings[_id] = newRating;
                localStorage.setItem("userRatings", JSON.stringify(userRatings)); // Cập nhật lại giá trị userRatings trong localStorage

                toast.success('Đánh giá thành công!',
                    {theme: "colored"}
                )

            } else {
                toast.info("Vui lòng đăng nhập để đánh giá phim!",
                    {theme: "colored"}
                )
                setUserRating(0);
            }

        } catch (err) {
            console.log(err.message);
        }
    };


    useEffect(() => {
        if (!isLoggedIn) {
            setUserRating(0);
        }
    }, [isLoggedIn])


    if (!movie) {
        return (
            <div className={'d-block mt-5 justify-content-center'}>
                <h1>
                    Không tìm thấy phim
                </h1>
                <NavLink to={'/'}>
                    <Button>
                        Về trang chủ
                    </Button>
                </NavLink>
            </div>
        )
    }

    return (
        <div>
            <BreadcrumbExample
                movie={movie}
            />

            <div style={{backgroundColor: '#c8cbcb'}}>
                <div
                    className={cx('mt-2', 'mb-5', 'header', 'large', 'border', 'first')}
                    style={{
                        borderBottom: '1px solid rgba(31.5, 10.5, 10.5, 1)',
                        backgroundPosition: 'left calc((42vw - 170px) - 340px) top',
                        // calc((14vw - 170px) - 340px)
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${movie.poster_path.startsWith("/")
                            ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                            : movie.poster_path})`,
                        borderRadius: 'var(--default-border-radius)'
                    }}

                >
                    <div className={cx('keyboard_s', 'custom_bg')}>
                        <div className={cx('single_column')}>
                            <section id='original_header' className={cx('images', 'inner')}>
                                <div className={cx('poster_wrapper')}>
                                    <img
                                        src={
                                            movie.poster_path.startsWith("/")
                                                ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                                                : movie.poster_path
                                        }
                                        alt={movie.title}
                                    />
                                </div>
                                <div className={cx('header_poster_wrapper')}>
                                    <section className={cx('header', 'poster')}>
                                        <div className={cx('title')}>
                                            <h2>
                                                <NavLink to={`/movie/${movie._id}`}>
                                                <span className={cx('movie-title')}>
                                                    {movie.title}
                                                </span>
                                                </NavLink>
                                                <span className={cx('ms-2', 'release-year')}>
                                                ({getReleaseYear(movie.release_date)})
                                            </span>
                                            </h2>
                                            <div className={cx('facts')}>
                                            <span className={cx('release-date')}>
                                                {formatReleaseDate(movie.release_date)}
                                            </span>
                                                <span className={cx('genres')}>
                                                {movie.genres.map((genre, index) => (
                                                    genre.name
                                                )).join(', ')
                                                }
                                            </span>
                                            </div>
                                        </div>
                                        <div className={cx('mt-3', 'mb-5', 'user-score')}>
                                            <CircularProgressBarVote
                                                value={(movie.vote_average_user * 10)}
                                                text={`${(movie.vote_average_user * 10)}%`}
                                                className={cx('me-3', 'user-score-percent')}
                                            />
                                            <div>
                                                <h2>
                                                    User Score
                                                </h2>
                                                {
                                                    movie.vote_count_user !== 0
                                                        ? (
                                                            <span>
                                                            (Đánh giá
                                                                &nbsp;
                                                                <b>{movie.vote_average_user}/10</b>
                                                                &nbsp;
                                                                bởi <b>{movie.vote_count_user}</b> người dùng)
                                                        </span>
                                                        )
                                                        : (
                                                            <span>
                                                            (Chưa có đánh giá)
                                                        </span>
                                                        )
                                                }
                                            </div>
                                        </div>
                                        <div className={cx('header-info')}>
                                            <div className={cx('overview')}>
                                                <h3>Overview</h3>
                                                <p>{movie.overview}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className={'mt-5'}>
                                                Rate
                                            </h2>
                                            <div>
                                                <ReactStars
                                                    size={50}
                                                    count={10}
                                                    isHalf={false}
                                                    emptyIcon={<AiFillStar/>}
                                                    fullIcon={<AiFillStar/>}
                                                    onChange={ratingChanged}
                                                    value={userRating}
                                                    activeColor="#ffd700"
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div className={cx('featured-movies')}>
                    <button className={cx('featured-movies-title')}>
                        <h2>Phim nổi bật</h2>
                    </button>
                    {featuredMovies.length > 0 && (
                        <div className={cx("card-movie")}>
                            <Row xs={1} md={2} lg={4} className="g-4 mb-10 mt-10">
                                {featuredMovies.map((movie) => (
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
                    )}
                </div>
            </div>

            <ToastContainer/>
        </div>
    );
}

export default MovieInfo;