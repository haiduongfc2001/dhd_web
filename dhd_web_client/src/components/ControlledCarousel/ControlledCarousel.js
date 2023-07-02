import {useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import api from "~/api/api";

import styles from './ControlledCarousel.module.scss'
import classNames from "classnames/bind"
import {Link} from "react-router-dom";

const cx = classNames.bind(styles)

function ControlledCarousel() {
    // const [index, setIndex] = useState(0);
    const [carouselMovies, setCarouselMovies] = useState([]);

    // const handleSelect = (selectedIndex) => {
    //     setIndex(selectedIndex);
    // };

    useEffect(() => {
        api.get('/movies')
            .then(response => {
                const sortedMovies = response.data.sort((a, b) => b.vote_average_user - a.vote_average_user);
                const top5Movies = sortedMovies.slice(0, 5);
                setCarouselMovies(top5Movies);
            })
            .catch(err => console.log(err.message));
    }, [setCarouselMovies]);

    return (
        <div className={cx('carousel-wrapper')}>
            <div className={cx('carousel-centered')}>
                {carouselMovies.length !== 0 && (
                    // variant="dark"
                    <Carousel fade className={cx('carousel-fade')}>
                        {carouselMovies.map(movie => (
                            <Carousel.Item
                                key={movie._id}
                                className={cx('carousel-item')}
                            >
                                <Link to={`/movie/${movie._id}`}>
                                    <div className={cx('carousel-img-container')}>
                                        <img
                                            className={cx('d-block', 'w-100', 'img-fluid', 'carousel-img')}
                                            src={
                                                movie.poster_path.startsWith("/")
                                                    ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
                                                    : movie.poster_path
                                            }
                                            alt={movie.title}
                                        />
                                    </div>
                                    <Carousel.Caption className={cx('carousel-caption', 'mb-3')}>
                                        <h3>{movie.title}</h3>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
            </div>
        </div>

        // <!-- Carousel wrapper -->

        // <Carousel activeIndex={index} onSelect={handleSelect}>
        //     {
        //         carouselMovies.length !== 0 && (
        //             carouselMovies.map(movie => (
        //                 <Carousel.Item key={movie._id}>
        //                     <img
        //                         classNameName="d-block w-100"
        //                         src={
        //                             movie.poster_path.startsWith("/")
        //                                 ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
        //                                 : movie.poster_path
        //                         }
        //                         alt={movie.title}
        //                     />
        //                     <Carousel.Caption>
        //                         <h3>{movie.title}</h3>
        //                         {/*<p>{movie.}</p>*/}
        //                     </Carousel.Caption>
        //                 </Carousel.Item>
        //             ))
        //         )
        //     }
        // </Carousel>
    );
}

export default ControlledCarousel;