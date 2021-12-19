import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { actLogin } from './../action/index'


function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const signin = (isAd) => dispatch(actLogin(isAd));

    const notify = (string) => toast(string);

    function SubmitForm(e) {
        var username = document.getElementById('txtUsername').value;
        var password = document.getElementById('txtPassword').value;
        if (username === "" || password === "") {
            notify("Đăng nhập thất bại")
            return
        }
        var apiBaseUrl = "http://localhost:8081/api/auth/signin";
        var payload = {
            "username": username,
            "password": password
        }
        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                if (response.status == 200) {
                    notify("Đăng nhập thành công!!")
                    localStorage.setItem('token', JSON.stringify(response.data.accessToken));
                    localStorage.setItem('user', JSON.stringify(true));
                    var admin = (username === 'admin' && password === "admin123456")
                    localStorage.setItem('admin', JSON.stringify(admin));
                    if (admin) signin(admin);
                    signin(false);
                }
            })
            .catch(function (error) {
                notify("Đăng nhập thất bại")
                history.push('/signin')
            });
        history.push('/')
    }

    return (
        <div className="top-bar">
            <div className="container">
                <div className="row" >
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 center-block">

                        <form >
                            <legend>Đăng nhập</legend>

                            <div className="form-group text-left">
                                <label >Username</label>
                                <input type="text" className="form-control" id="txtUsername" placeholder="Nhập username" />
                            </div>

                            <div className="form-group text-left">
                                <label >Password</label>
                                <input type="password" className="form-control" id="txtPassword" placeholder="Nhập password" />
                            </div>

                            <button type="submit" onClick={SubmitForm} className="btn btn-primary center-block">Submit</button>

                            <ToastContainer />
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
