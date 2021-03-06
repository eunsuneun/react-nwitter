import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import { Redirect } from "react-router-dom";

const AppRouter = ({ refreshUser, isLoggenIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggenIn && <Navigation userObj={userObj} />}
      <Switch>
        <>
          {isLoggenIn ? (
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Redirect from="*" to="/" />
            </div>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
              <Redirect from="*" to="/" />
            </>
          )}
        </>
      </Switch>
    </HashRouter>
  );
};

export default AppRouter;