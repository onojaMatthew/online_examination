import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Admin/Dashboard/Home/Home";
import Login from "./Admin/Login/Login";
import ChurchHomePage from "./Church/Home/Home";
import ChurchLogin from "./Church/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route path="/dashboard" render={(props) => <Home {...props} />} />
        <Route path="/church-login" render={(props) => <ChurchLogin {...props} />} />
        <Route path="/church/:subdomain" render={(props) => <ChurchHomePage {...props} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
