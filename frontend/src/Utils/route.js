import Account from "../Pages/Account/Account";
import Home from "../Pages/Home/Home";
import Welcome from "../Pages/Welcome/Welcome";
import { URLS } from "./Constants";

let routes = [
  {
    isPrivate: false,
    route: URLS.welcome,
    component: <Welcome />,
  },
  {
    isPrivate: true,
    route: URLS.home,
    component: <Home />,
  },
  {
    isPrivate: true,
    route: URLS.account,
    component: <Account />,
  },
];

export default routes;
