import { useState } from "react";
import "../auth.css";
import { useDebounce } from "../store/hooks/useDebounce";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { showToastAtom, toastIconColorAtom, toastMsgAtom } from "../store/atoms/toastAtom";
import Toast from "./Toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showToast, setShowToast] = useRecoilState(showToastAtom);
    const setToastMsg = useSetRecoilState(toastMsgAtom);
    const setToastIcon = useSetRecoilState(toastIconColorAtom);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleConfPassword = (e) => {
        setConfPassword(e.target.value);
    };
    const debounceFnUsername = useDebounce(handleUsername, 1000);
    const debounceFnPass = useDebounce(handlePassword, 1000);
    const debounceFnConfPass = useDebounce(handleConfPassword, 1000);

    const handleSignup = async () => {
        try {
            const response = await axios.post("https://api.lawprobe.xyz/v1/user/signup", {
                username: username,
                password: password,
                confirmPassword: confPassword,
            });

            if (response.status === 201) {
                setToastMsg(response.data.message);
                setToastIcon("green");
                navigate("/login");
            } else if (response.status === 404) {
                setToastMsg(response.data.message);
                setToastIcon("red");
            } else if (response.status === 400) {
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
                <h1>Sign Up</h1>
            </div>
            <div className="authInp">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={debounceFnUsername}
                />
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={debounceFnPass}
                    />
                    <span
                        className="password-toggle-icon2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                    </span>
                </div>
                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        onChange={debounceFnConfPass}
                    />
                    <span
                        className="password-toggle-icon"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                    </span>
                </div>
            </div>
            <div>
                <button className="signbtn" onClick={handleSignup}>Submit</button>
            </div>
            <div className="navigate">
                <h4>Already have an account?</h4><Link to="/login">Log in</Link>
            </div>
            {showToast && <Toast />}
        </div>
    );
}

export default Signup;
