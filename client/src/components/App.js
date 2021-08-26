import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Admin/Dashboard/Home/Home";
import Login from "./Admin/Login/Login";
import LandingPage from "./User/Home/LandingPage";
import Complete from "./User/Start/Complete";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route path="/test/:domain_name" render={() => <LandingPage />} />
          <Route path="/complete" render={() => <Complete />} />
          <Route exact path="/dashboard" render={(props) => <Home {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
