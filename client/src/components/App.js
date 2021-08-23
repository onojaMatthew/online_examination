import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./User/Home/LandingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <div><h2>Hello Admin</h2></div>} />
          <Route path="/test/:domain_name" render={() => <LandingPage />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
