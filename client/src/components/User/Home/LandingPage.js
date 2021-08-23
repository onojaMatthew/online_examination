import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Instruction from "../Instruction/Instruction";
import Start from "../Start/Start";
import HomePage from "./HomePage";

const LandingPage = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}`} render={() => <HomePage />} />
        <Route exact path={`${match.url}/instruction`} render={(props) => <Instruction {...props} />} />
        <Route path={`${match.url}/start`} render={() => <Start />} />
      </Switch>
    </div>
  );
}

export default LandingPage;