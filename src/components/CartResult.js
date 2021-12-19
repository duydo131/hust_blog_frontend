import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actDeleteAllInCart } from './../action/index'
import { useDispatch } from 'react-redux';

CartResut.propTypes = {
  cart: PropTypes.array,
};

CartResut.defaultProps = {
  cart: null,
};


function CartResut(props) {
  let history = useHistory();
  var { cart } = props;

  const notify = (notification) => toast(notification);
  const dispatch = useDispatch();
  const deleteAll = () => dispatch(actDeleteAllInCart());

  function postBroken() {
    var data = JSON.parse(localStorage.getItem('CART'));
    var token = JSON.parse(localStorage.getItem('token'));

    var apiBaseUrl = "http://localhost:8081/broken";
    var payload = [];
    for (var i = 0; i < data.length; i++) {
      payload.push({
        "quantity": data[i].quantity,
        "product": { "id": data[0].product['id'] }
      });
    }
    axios.post(
      apiBaseUrl,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(function (response) {
        alert("Bạn đã mua sản phẩm thành công!")
        localStorage.removeItem("CART");
        deleteAll()
        history.push('/')
      })
      .catch(function (error) {
        if (error.response.status === 401 && !token)
          notify("No Login! Try Login");
        else
          notify("Error Server!! Cannot purchase now");
      });
  }

  function showTotalAmount(cart) {
    var total = 0;
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        total += cart[i].product.price * cart[i].quantity;
      }
    }
    return total;
  }

  return (
    <tr>
      <td colSpan="3"></td>
      <td>
        <h4>
          <strong>Tổng Tiền</strong>
        </h4>
      </td>
      <td>
        <h4>
          <strong>{showTotalAmount(cart)} đồng</strong>
        </h4>
      </td>
      <td colSpan="3">
        <button
          type="button"
          className="btn btn-primary waves-effect waves-light"
          onClick={postBroken}
        >
          Mua
        </button>
        <ToastContainer />
      </td>
    </tr>
  );
}

export default CartResut;
