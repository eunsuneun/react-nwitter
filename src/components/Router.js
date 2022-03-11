import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [ isLoggenIn, setIsLoggenIn ] = useState(false);
  return (
    <HashRouter>
      <Switch>
        {isLoggenIn ?
        <>
          <Route exact path="/">
            <Home />
          </Route>
        </> :
        <Route exact path="/"><Auth /></Route>
        }
      </Switch>
    </HashRouter>
  )
};

export default AppRouter;