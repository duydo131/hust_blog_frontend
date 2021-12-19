import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Carts from './Carts'
import Signup from './Register'
import Login from './Login'
import Admin from './Admin'
import { useDispatch, useSelector } from 'react-redux';
import { actLogout } from './../action/index'
import Footer from './Footer'
import { useHistory } from "react-router-dom";

function Header() {
  let history = useHistory();
  const dispatch = useDispatch();
  const signout = () => dispatch(actLogout());
  var isAuth = useSelector(state => state.auth)
  var isAdmin = useSelector(state => state.admin)

  function handleLogout() {
    signout()
  }

  let button;
  if (!isAuth) {
    button =
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">

        <li className="dropdown-item waves-effect waves-light" >
          <Link to="/signup">Đăng ký</Link>
        </li>
        <li className="dropdown-item waves-effect waves-light">
          <Link to="/signin">Đăng nhập</Link>
        </li>
      </div>
  } else {
    button =
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">

        <li onClick={handleLogout} className="dropdown-item waves-effect waves-light">
          <Link to="/logout">Đăng xuất</Link>
        </li>
      </div>
  }

  let adminPage = <span></span>;
  if (isAdmin) {
    adminPage =
      <li className="breadcrumb-item">
        <Link to="/admin" exac>Admin</Link>
      </li>
  }


  return (
    <Router>
      <div>
        <header>
          <nav className="navbar fixed-top navbar-toggleable-md navbar-expand-lg navbar-dark scrolling-navbar double-nav">

            <div className="breadcrumb-dn mr-auto">
              <ol className="breadcrumb header-breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Trang Chủ</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/cart" exac>Giỏ hàng</Link>
                </li>
                {adminPage}

              </ol>
            </div>

            <ul className="nav navbar-nav nav-flex-icons ml-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle waves-effect waves-light" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  <i className="fa fa-user"></i> Tài Khoản</a>
                {button}
              </li>
            </ul>

          </nav>

          <Route path='/' exact component={Home} />
          <Route path='/cart' exact component={Carts} />
          <Route path='/admin' exact component={Admin} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/signin' exact component={Login} />
          <Route path='/logout' exact component={Home} />
        </header>
        <Footer />
      </div>
    </Router>
  );
}

export default Header;
