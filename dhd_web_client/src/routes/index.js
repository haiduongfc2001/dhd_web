// Public Routes
import Home from "~/pages/Home";
import SignIn from "~/components/Authentication/SignIn/SignIn";
import Register from "~/components/Authentication/Register/Register";
import NotFound from "~/components/NotFound/NotFound";
import ForgotPassword from "~/components/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "~/components/Authentication/ForgotPassword/ResetPassword";
import EmailVerified from "~/components/Authentication/EmailVerified";
import Profile from "~/pages/Profile/Profile";
import MovieInfo from "~/pages/MovieInfo/MovieInfo";
import Test from "~/test";

export const publicRoutes = [
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: SignIn, layout: null },
    // { path: '/test', component: Test, layout: null },
    { path: '/not-found', component: NotFound },
    { path: '/', component: Home },
    { path: '/verify', component: EmailVerified, layout: null },
    { path: '/forgot-password', component: ForgotPassword, layout: null },
    { path: '/reset-password', component: ResetPassword, layout: null },
    { path: '/profile', component: Profile },
    { path: '/movie/:_id', component: MovieInfo }
]

// Private Routes
export const privateRoutes = [
]

export const errorRoutes = [
    // { path: '/not-found', component: NotFound },
    // ... other error routes
];

// export  default [
//     publicRoutes,
//     privateRoutes,
//     errorRoutes
// ];