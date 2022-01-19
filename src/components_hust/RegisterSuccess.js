import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

RegisterSuccess.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

function RegisterSuccess(props) {
  const { username, password, email } = props;
  return (
    <div style={{ marginTop: '1%' }}>
      <div className="container">
        <div className="row" >
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 center-block" style={{marginLeft: '38.5%'}}>
              <legend>Đăng kí thành công</legend>

              <div className="form-group text-left">
                <label >Email: </label>
                <label style={{marginLeft: '2%'}}>{email}</label>
              </div>
              <div className="form-group text-left">
                <label >Tài khoản: </label>
                <label style={{marginLeft: '2%'}}>{username}</label>
              </div>
              <div className="form-group text-left">
                <label >Mật khẩu: </label>
                <label style={{marginLeft: '2%'}}>{password}</label>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;
