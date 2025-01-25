import { useState } from "react";
import "../auth.css";
import { useDebounce } from "../store/hooks/useDebounce";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { usernameAtom } from "../store/atoms/usernameAtom";
import { showToastAtom, toastIconColorAtom, toastMsgAtom } from "../store/atoms/toastAtom";
import Toast from "./Toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const storeUsername = useSetRecoilState(usernameAtom);
  const [showToast,setShowToast ]= useRecoilState(showToastAtom);
  const setToastMsg = useSetRecoilState(toastMsgAtom);
  const setToastIcon = useSetRecoilState(toastIconColorAtom);

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const debounceFnUsername = useDebounce(handleUsername, 1000);
  const debounceFnPass = useDebounce(handlePassword, 1000);


  const handleLogin = async () => {

    try {
      const response = await axios.post("http://localhost:3000/v1/user/login", {
        username: username,
        password: password,
      });
      
      if (response.status === 200) {
        setToastMsg(response.data.message);
        setToastIcon("green"); 
        storeUsername(username);
        localStorage.setItem("username", username);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else if (response.status === 400) {
        setToastMsg(response.data.message); 
        setToastIcon("red"); 
      } else if (response.status === 404) {
        setToastMsg("User not found"); 
        setToastIcon("yellow"); 
      } else {
        setToastMsg("Unexpected response");
        setToastIcon("yellow");
      }

      setShowToast(true);

    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
      setToastMsg(error.response ? error.response.data.message : "An error occurred");
      setToastIcon("red");
      setShowToast(true);
    }
  };
  return (
    <div className="auth">
      <div>
        <h1>Log In</h1>
      </div>
      <div className="authInp">
        <input
          type="text"
          placeholder="Username"
          onChange={debounceFnUsername}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={debounceFnPass}
        />
      </div>
      <div>
        <button className="signbtn" onClick={handleLogin}>
          Submit
        </button>
      </div>
      <div className="navigate">
        <h4>New User?</h4>
        <Link to="/signup">Create an account</Link>
      </div>
      {showToast && <Toast/>}
    </div>
  );
}

export default Login;
