// Public Routes
import Home from "~/pages/Home";
import SignIn from "~/components/Authentication/SignIn/SignIn";
import Test from "~/test";
import Register from "~/components/Authentication/Register/Register";
import Authentication from "~/components/Authentication/Authentication";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/test', component: Test, layout: null },
    { path: '/authen', component: Authentication, layout: null },
]

// Private Routes
const privateRoutes = [

]

export { publicRoutes, privateRoutes }