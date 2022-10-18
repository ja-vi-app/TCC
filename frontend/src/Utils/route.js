import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import { URLS } from "./Constants";

let routes = [
  {
    isPrivate: true,
    route: URLS.home,
    component: <Home />,
  },
  {
    isPrivate: false,
    route: URLS.login,
    component: <Login />,
  },
];

export default routes;
