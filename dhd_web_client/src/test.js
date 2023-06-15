// import {useContext, useEffect, useState} from "react";
// import {useParams} from "react-router-dom";
// import api from "~/api/api";
// import {AiFillStar} from "react-icons/ai";
// import ReactStars from "react-rating-stars-component/dist/react-stars";
// import {AuthContext} from "~/context/AuthContext";
//
// import {toast} from "react-toastify";
//
//
// function MovieInfo() {
//     const {_id} = useParams();
//     const [movie, setMovie] = useState(null);
//     const [userRating, setUserRating] = useState(0);
//
//     const {user, isLoggedIn} = useContext(AuthContext);
//
//     const fetchMovie = async () => {
//         try {
//             const response = await api.get(`/movie/${_id}`);
//             const movieData = response.data;
//             setMovie(movieData);
//
//             if (movieData && user) {
//                 const ratingUser = movieData.ratings.find(
//                     (rating) => String(rating.user) === user._id
//                 );
//                 if (ratingUser) {
//                     setUserRating(ratingUser.rating);
//                     const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
//                     userRatings[_id] = ratingUser.rating;
//                     localStorage.setItem("userRatings", JSON.stringify(userRatings));
//                 } else {
//                     const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
//                     const storedRating = userRatings[_id];
//                     if (storedRating) {
//                         setUserRating(parseFloat(storedRating));
//                     } else {
//                         setUserRating(0);
//                     }
//                 }
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     };
//
//     useEffect(() => {
//         fetchMovie();
//     }, [_id, fetchMovie, user]);
//
//     const ratingChanged = async (newRating) => {
//         if (isLoggedIn) {
//             setUserRating(newRating);
//
//             const ratingData = {
//                 rating: newRating,
//                 userId: user._id,
//             };
//
//             try {
//                 const response = await api.post(`/movie/${_id}/rating`, ratingData);
//                 setUserRating(response.data.rating);
//
//                 // Cập nhật giá trị trong localStorage
//                 const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
//                 userRatings[_id] = response.data.rating;
//                 localStorage.setItem("userRatings", JSON.stringify(userRatings));
//
//                 toast.success("Đánh giá phim thành công!");
//             } catch (err) {
//                 console.log(err.message);
//             }
//         } else {
//             setUserRating(0);
//             toast.info("Vui lòng đăng nhập để đánh giá phim!");
//         }
//     };
//
//
//     if (!movie) {
//         return (
//             <h1>
//                 Không tìm thấy phim
//             </h1>
//         )
//     }
//
//     return (
//         <div>
//             <h1>
//                 {movie.title}
//             </h1>
//             <ReactStars
//                 size={50}
//                 count={10}
//                 isHalf={false}
//                 emptyIcon={<AiFillStar/>}
//                 fullIcon={<AiFillStar/>}
//                 onChange={ratingChanged}
//                 value={userRating}
//                 activeColor="#ffd700"
//             />
//         </div>
//     );
// }
//
// export default MovieInfo;