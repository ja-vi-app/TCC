import Home from "../Pages/Home";
import Login from "../Pages/Login";
import { URLS } from "./Constants";

 let routes = [
    {
        isPrivate: true,
        route: URLS.home,
        component: <Home />
    },
    // Para adicionar mais rotas basta colocar um novo OBJ como o de exemplo abaixo
    // {
    //     isPrivate: true,
    //     route: '/sub-page',
    //     component: <SubPage />
    // },
    {
        isPrivate: false,
        route: URLS.login,
        component: <Login />
    }
]

export default routes