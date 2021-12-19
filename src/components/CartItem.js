import React from 'react';
import PropTypes from 'prop-types';
import * as Message from './../constants/Message'

CartItem.propTypes = {
  item: PropTypes.object,
  onDeleteProductInCart: PropTypes.func,
  onChangeMessage: PropTypes.func,
  onUpdateProductInCart: PropTypes.func,
};

CartItem.defaultProps = {
  item: null,
  onDeleteProductInCart: null,
  onChangeMessage: null,
  onUpdateProductInCart: null,
};

function CartItem(props) {
  var { item } = props;

  function totalAmount(price, quantity) {
    return price * quantity;
  }

  function onDelete(product) {
    var { onDeleteProductInCart, onChangeMessage } = props;
    onDeleteProductInCart(product);
    onChangeMessage(Message.MSG_DELETE_CART_SUCCESS);
  }

  function onUpdateQuantity(product, quantity) {
    if (quantity > 0) {
      var { onUpdateProductInCart, onChangeMessage } = props;
      onUpdateProductInCart(product, quantity);
      onChangeMessage(Message.MSG_UPDATE_CART_SUCCESS);
    }
  }

  return (
    <tr>
      <th scope="row">
        <img src={item.product.image}
          alt="" className="img-fluid z-depth-0" />
      </th>
      <td>
        <h5>
          <strong>{item.product.name}</strong>
        </h5>
      </td>
      <td>{item.product.price}$</td>
      <td className="center-on-small-only">
        <span className="qty">{item.quantity} </span>
        <div className="btn-group radio-group" data-toggle="buttons">
          <label
            onClick={() => onUpdateQuantity(item.product, item.quantity - 1)}
            className="btn btn-sm btn-primary btn-rounded waves-effect waves-light">
            <a>—</a>
          </label>
          <label
            onClick={() => onUpdateQuantity(item.product, item.quantity + 1)}
            className="btn btn-sm btn-primary btn-rounded waves-effect waves-light">
            <a>+</a>
          </label>
        </div>
      </td>
      <td>{totalAmount(item.product.price, item.quantity)}$</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-primary waves-effect waves-light"
          data-toggle="tooltip"
          data-placement="top"
          title=""
          data-original-title="Remove item"
          onClick={() => onDelete(item.product)}
        >
          X
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
