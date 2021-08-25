import { useEffect, useState } from "react";
import { Row, Col, Input } from "reactstrap";
import { Avatar, Button, Image } from "antd";
// import User from "../../../assets/images/User.jpeg";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../../store/actions/actions_login";
import Icon from "../../../assets/images/employee.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginSuccess } = useSelector(state => state.account);
  const [ values, setValues ] = useState({ email: "", password: "" });

  const { email, password } = values;
  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {}
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({...values, [name]: value });
  }

  const handleSubmit = () => {
    console.log(values, " values")
    const data = { email, password };
    dispatch(adminLogin(data));
  }

  useEffect(() => {
    if (loginSuccess) {
      window.location.href = "/dashboard";
    }
  }, [ loginSuccess ]);
  
  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" lg="4" xl="4" className="instruction-left-cont">
          <h3 className="text-center">Welcome to XYZ Test</h3>
          <Row className="mt-5">
            <Col xs="6" sm="6" md="6" lg="6" xl="6">
              <p className="questn-no">No. of questions</p>
              <p className="questn-no">50</p>
            </Col>
            <Col xs="6" sm="6" md="6" lg="6" xl="6">
              <p>Test duration</p>
            </Col>
          </Row>  
          <Row className="text-center pl-5">
            <Col className="pl-5" xs="6" sm="6" md="6" lg="6" xl="6">
              <Image src={Icon} preview={false} width={300} />
            </Col>
          </Row>   
        </Col>
        <Col xs="12" sm="12" md="12" lg="8" className="instruction-right-cont">
          <Row>
            <Col xs="12" sm="12" md="12" lg={{ size: 6, offset: 3 }} xl={{ size: 6, offset: 3 }}>
              <h3 className="mb-5">Sign in by entering the information below</h3>
              <label>Email *</label>
              <Input onChange={(e) => handleChange(e)} placeholder="Enter email" type="email" name="email" value={email} />
              <label>Password *</label>
              <Input onChange={(e) => handleChange(e)} placeholder="Enter password" type="password" name="password" value={password} />
              <p className="mb-4 forgot-p-text">Forgot password</p>
              {loginLoading ? <Button className="login-button" loading>Loading...</Button> : <Button onClick={handleSubmit} className="login-button">Login</Button>}
            </Col>
          </Row>
        </Col>
      </Row> 
    </div>
  );
}

export default Login;