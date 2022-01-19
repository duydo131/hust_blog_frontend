import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actEnableToast } from './../action/index'
import callApiHttp from "./callApiHttp"

function Register() {

  let history = useHistory(); 
  const dispatch = useDispatch();
  const toast = (message) => dispatch(actEnableToast(message));

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleRepeatNewPasswordChange = (event) => {
    setRepeatNewPassword(event.target.value);
  };


  async function changePasswordProcess() {
    try {
      const res = await callApiHttp({
        url: `/auth/change-password`,
        method: 'POST',
        data: {
          'old-password': oldPassword,
          'new-password-1': newPassword,
          'new-password-2': repeatNewPassword,
        }
      })
      // console.log(res)
      if (res.status === 200) {
        toast("Thay đổi mật khẩu thành công")
        history.push("/add-post")
      }
    } catch (err) {
      toast(err.response.data.message)

    }
  }

  return (
    <div style={{ marginTop: '1%' }}>
      <div className="container">
        <div className="row" >
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 center-block" style={{ marginLeft: '10%' }}>
            <legend>Thay đổi mật khẩu</legend>

            <div className="form-group text-left">
              <label >Mật khẩu cũ</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu cũ"
                onChange={handleOldPasswordChange}

              />
            </div>

            <div className="form-group text-left">
              <label >Mật khẩu mợi</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khâỉ mới"
                onChange={handleNewPasswordChange}
              />
            </div>

            <div className="form-group text-left">
              <label >Nhập lại mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập lại mật khẩu mới"
                onChange={handleRepeatNewPasswordChange}
              />
            </div>


            <button type="submit" onClick={changePasswordProcess} className="btn center-block" style={{ backgroundColor: "blue", cursor: 'pointer' }}>Thay đổi mật khẩu</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
