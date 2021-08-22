import { BrowserRouter, Route } from "react-router-dom";
// import Home from "./Admin/Dashboard/Home/Home";
// import Login from "./Admin/Login/Login";
// import ChurchHomePage from "./Church/Home/Home";
import HomePage from "./User/Home/HomePage";
import Instruction from "./User/Instruction/Instruction";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/:domain_name/test" render={(props) => <HomePage {...props} />} />
        {/* <Route path="/dashboard" render={(props) => <Home {...props} />} /> */}
        {/* <Route path="/church-login" render={(props) => <Login {...props} />} /> */}
        <Route path="/:domain_name/test/instruction" render={(props) => <Instruction {...props} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
