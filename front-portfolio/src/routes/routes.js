import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import AdvisorHome from "../pages/advisor/home";
import CreateClient from "../pages/client/create";
import UpdateClient from "../pages/client/update";
import CreateAdvisor from "../pages/advisor/create";
import UpdateAdvisor from "../pages/advisor/update";
import AssetsHome from "../pages/Assets/home";
import PortifolioHome from "../pages/portifolio/home";
import PortifolioCreate from "../pages/portifolio/create";

const Routes = () => {
    return (
        <BrowserRouter >
            < Route component={Login} path="/" exact />
            < Route component={AdvisorHome} path="/advisor/home" />
            < Route component={CreateAdvisor} path="/advisor/create" />
            < Route component={CreateClient} path="/client/create" exact />
            < Route component={UpdateClient} path="/client/update" exact />
            < Route component={UpdateAdvisor} path="/advisor/update" />
            < Route component={AssetsHome} path="/assets/home" />
            < Route component={PortifolioHome} path="/portifolio/home" />
            < Route component={PortifolioCreate} path="/portifolio/create" />
        </BrowserRouter>
    )
}

export default Routes;