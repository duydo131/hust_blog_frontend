import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    let history = useHistory();
    const notify = () => toast("Đăng kí thành công!!");
    function SignupHandle(e) {
        var email = document.getElementById('txtEmail').value;
        var username = document.getElementById('txtUsername').value;
        var password = document.getElementById('txtPassword').value;
        var confirmPassword = document.getElementById('txtConfirmPassword').value;
        var credit = document.getElementById('txtCredit').value;
        if (password !== confirmPassword) {
            alert("Password is invalid")
            return
        }
        var apiBaseUrl = "http://localhost:8081/api/auth/signup";
        var payload = {
            "email": email,
            "username": username,
            "password": password,
            "credit_card": credit,
            "role": [
                "USER"
            ]
        }

        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                console.log("Signup successfull");
                notify()
                alert("xxx")
                history.push('/signin')
            })
            .catch(function (error) {
                alert("username exists")
            });
    }

    return (
        <div className="top-bar">
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center center-block">
                <form >
                    <div className="form-group text-left">
                        <label>Email</label>
                        <input type="text"
                            className="form-control"
                            id="txtEmail"
                            placeholder="email"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label>Username</label>
                        <input type="text"
                            className="form-control"
                            id="txtUsername"
                            placeholder="username"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label>Password</label>
                        <input type="password"
                            className="form-control"
                            id="txtPassword"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label >Confirm Password</label>
                        <input type="password"
                            className="form-control"
                            id="txtConfirmPassword"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label >Credit</label>
                        <input type="text"
                            className="form-control"
                            id="txtCredit"
                            placeholder="Number Credit"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary center-block"
                        onClick={SignupHandle}
                    >
                        Register
                </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default Signup;
