import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actLogout, actEnableManager } from './../action/index'
import { Snackbar, Slide } from '@material-ui/core';


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function Header() {
  let history = useHistory();
  const dispatch = useDispatch();

  const signout = () => dispatch(actLogout());
  const enableManager = () => dispatch(actEnableManager())

  var isAuth = useSelector(state => state.auth)
  const [icon, setIcon] = useState()
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  if (isAuth) {
    if (icon !== '-') setIcon('-')
  }
  else {
    if (icon !== '+') setIcon('+')
  }

  const managerOnClickHandler = () => {
    enableManager()
    history.push("/add-post")
  }

  const manager = () => {
    if (!isAuth) return ''
    return (
      <span>
        <span onClick={managerOnClickHandler} style={{cursor: 'pointer'}}>Quản lý</span>
        <span className="textRight">|</span>
      </span>
    )
  }

  function handlerLogin() {
    // console.log(history)
    if (icon === '+') history.push('/login');
    else {
      setIcon('+')
      signout()
      setErrorMessage("Đăng xuất thành công")
      setOpen(true)
      history.push('/');
    }
  }


  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <header id="banner" role="banner">
        <div>
          <div className="border-top"></div>
          <div id="banner-wrapper">
            <div id="banner-left"> <a id="logo" href="https://www.hust.edu.vn/web/vi/home" title="Trở về Trang chủ"> <img src="/hust_files/logoEn.png" alt="HUST" /> </a> </div>
            <div id="banner-right">
              <div className="line1">
                <span style={{ float: 'right' }}>
                  <a
                    data-redirect="false"
                    // href="https://www.hust.edu.vn/?p_p_id=58&amp;p_p_lifecycle=0&amp;p_p_state=maximized&amp;p_p_mode=view&amp;saveLastPath=false&amp;_58_struts_action=%2Flogin%2Flogin" 
                    id="sign-in"
                    rel="nofollow"
                    onClick={handlerLogin}
                    style={{ cursor: 'pointer' }}
                  >
                    ({icon})
                  </a>
                  <span className="textRight">|</span>
                  {manager()}
                  <a href="https://www.hust.edu.vn/web/vi/lien-he">Liên hệ</a>
                  <span className="textRight">|</span>
                  <span className="textRight">Ngôn ngữ:</span>
                  <span className="changeLang">
                    <a href="https://www.hust.edu.vn/web/vi/home"><img src="/hust_files/vi.gif" /></a>
                    {/* <a href="https://en.hust.edu.vn/home" target="_blank"><img src="/hust_files/en.gif"/></a>  */}
                  </span>
                </span>
              </div>
              <div className="menuMobile"><button id="menu-toggle" type="button"> MENU <i className="icon-align-justify"></i></button></div>
              <div className="line2">
                <a href="https://www.hust.edu.vn/web/vi/tim-kiem">
                  <form
                    id="_77_fm"
                    className="form"
                    action="https://www.hust.edu.vn/$tabs1URL"
                    method="post"
                    name="_77_fm">
                    <input
                      style={{ marginBottom: '0px', height: '15px' }}
                      id="_77_keywords"
                      type="text"
                      name="_77_keywords"
                      value=""
                      placeholder="Tìm kiếm ..."
                      onfocus="if (this.value == &#39;Tìm kiếm ...&#39;) { this.value = &#39;&#39;; }" />
                    {/* <input 
                              id="_77_search" 
                              name="_77_search" 
                              title="Tìm kiếm" 
                              type="image" 
                              src="/hust_files/search-icon2.png"/> */}
                  </form>
                </a>
                <a className="loginMobile" data-redirect="false" href="https://www.hust.edu.vn/?p_p_id=58&amp;p_p_lifecycle=0&amp;p_p_state=maximized&amp;p_p_mode=view&amp;saveLastPath=false&amp;_58_struts_action=%2Flogin%2Flogin" id="sign-in" rel="nofollow">(+)</a>
              </div>
            </div>
            <div className="banner-new">
              <span><a href="http://ts.hust.edu.vn/">
                <img
                  style={{ width: '45px', marginTop: '5px', marginBottom: '7px' }}
                  src="/hust_files/open-day---website-icon_03.png" />
                <img
                  style={{ paddingLeft: '12px' }}
                  src="/hust_files/open-day---website-icon_11.png" />
              </a></span>
              <br />
              <span><a href="https://ctt-daotao.hust.edu.vn/">
                <img
                  style={{ width: '45px', marginBottom: '7px' }}
                  src="/hust_files/open-day---website-icon_06.png" />
                <img
                  style={{ paddingLeft: '12px' }}
                  src="/hust_files/open-day---website-icon_14.png" />
              </a></span>
              <br />
              <span><a href="http://alumni.hust.edu.vn/">
                <img
                  style={{ width: '45px' }}
                  src="/hust_files/open-day---website-icon_08.png" />
                <img
                  style={{ paddingLeft: '12px' }}
                  src="/hust_files/open-day---website-icon_17.png" />
              </a></span>
              <br />
            </div>
          </div>
        </div>
      </header>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        TransitionComponent={SlideTransition}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={errorMessage}
      />
    </div>
  )
}


export default Header;