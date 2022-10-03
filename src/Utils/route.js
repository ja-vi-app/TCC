import Home from "../Pages/Home";
import List from "../Pages/List";
import Login from "../Pages/Login";
import { URLS } from "./Constants";

let routes = [
  {
    isPrivate: true,
    route: URLS.home,
    component: <Home />,
  },
  {
    isPrivate: true,
    route: URLS.list,
    component: <List />,
  },
  {
    isPrivate: false,
    route: URLS.login,
    component: <Login />,
  },
];

export default routes;
