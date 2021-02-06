import { lazy, Suspense } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

//function
import history from "./function/history";

//Components
import Loading from "./components/Loading.js";
import { PrivateRoute, AuthRoute, AdminRoute } from "./function/PrivateRoute";

const Login = lazy(() => import("./components/Login.js"));
const Register = lazy(() => import("./components/Register.js"));
const Home = lazy(() => import("./components/Home.js"));
const Footer = lazy(() => import("./components/Footer"));
const AllTodo = lazy(() => import("./components/AllTodo"));

function App() {
    return (
        <Router history={history}>
            <Suspense fallback={<Loading height={0} />}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect from="/" to="home" />}
                    />
                    <PrivateRoute exact path="/home" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <AdminRoute exact path="/all" component={AllTodo} />
                </Switch>
                <Footer />
            </Suspense>
        </Router>
    );
}

export default App;
