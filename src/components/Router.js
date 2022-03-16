import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import { Redirect } from "react-router-dom";

const AppRouter = ({ isLoggenIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggenIn && <Navigation />}
      <Switch>
        {isLoggenIn ?
        <>
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Redirect from="*" to="/" />
        </> :
        <>
          <Route exact path="/">
            <Auth />
          </Route>
          <Redirect from="*" to="/" />
        </>
        }
      </Switch>
    </HashRouter>
  )
};

export default AppRouter;