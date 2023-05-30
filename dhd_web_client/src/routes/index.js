// Public Routes
import Home from "~/pages/Home";
import SignIn from "~/components/Authentication/SignIn/SignIn";
import Register from "~/components/Authentication/Register/Register";
import NotFound from "~/components/NotFound/NotFound";

export const publicRoutes = [
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: SignIn, layout: null },
    // { path: '/test', component: Test, layout: null },
    { path: '/not-found', component: NotFound, layout: null },
    { path: '/', component: Home },
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