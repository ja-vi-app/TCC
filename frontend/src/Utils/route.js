import Account from "../Pages/Account/Account";
import Home from "../Pages/Home/Home";
import Welcome from "../Pages/Welcome/Welcome";
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
    component: <Welcome />,
  },
  {
    isPrivate: true,
    route: URLS.account,
    component: <Account />,
  },
];

export default routes;
