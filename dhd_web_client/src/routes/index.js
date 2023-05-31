// Public Routes
import Home from "~/pages/Home";
import SignIn from "~/components/Authentication/SignIn/SignIn";
import Register from "~/components/Authentication/Register/Register";
import NotFound from "~/components/NotFound/NotFound";
import ForgotPassword from "~/components/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "~/components/Authentication/ResetPassword/ResetPassword";

export const publicRoutes = [
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: SignIn, layout: null },
    // { path: '/test', component: Test, layout: null },
    { path: '/not-found', component: NotFound, layout: null },
    { path: '/', component: Home },
    { path: '/forgot-password', component: ForgotPassword, layout: null },
    { path: '/reset-password', component: ResetPassword, layout: null },
]

// Private Routes
export const privateRoutes = [
]

const errorRoutes = [
    // { path: '/not-found', component: NotFound },
    // ... other error routes
];

export default [
    publicRoutes,
    privateRoutes,
    errorRoutes
];