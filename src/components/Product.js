import React from 'react';
import PropTypes from 'prop-types';
import * as Message from './../constants/Message'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Product.propTypes = {
  product: PropTypes.object,
  onAddToCart: PropTypes.func,
  onChangeMessage: PropTypes.func,
};

Product.defaultProps = {
  product: null,
  onAddToCart: null,
  onChangeMessage: null,
};


function Product(props) {
  const notify = () => toast("Thêm thành công vào giỏ hàng!");

  const { product, onAddToCart, onChangeMessage } = props;

  function showRatings(rating) {
    var result = [];
    for (var i = 1; i <= rating; i++) {
      result.push(<i key={i} className="fa fa-star"></i>);
    }
    for (var j = 1; j <= (5 - rating); j++) {
      result.push(<i key={i + j} className="fa fa-star-o"></i>);
    }
    return result;
  }

  function onAddToCart1(product) {
    onAddToCart(product);
    onChangeMessage(Message.MSG_ADD_TO_CART);
    notify()
  }

  return (
    <div className="col-lg-4 col-md-6 mb-r">
      <div className="card text-center card-cascade narrower">
        <div className="view overlay hm-white-slight z-depth-1">
          <img src={product.image_url}
            className="img-fluid" alt={product.name} width="322" height="322" />
          <a>
            <div className="mask waves-light waves-effect waves-light"></div>
          </a>
        </div>
        <div className="card-body">
          <h4 className="card-title">
            <strong>
              <a>{product.name}</a>
            </strong>
          </h4>
          <ul className="rating">
            <li>
              {showRatings(product.rating)}
            </li>
          </ul>
          <p className="card-text">
            {product.description}
          </p>
          <div className="card-footer">
            <span className="left">{product.price} đồng</span>
            <span className="right">
              <a
                className="btn-floating blue-gradient"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="Add to Cart"
                onClick={() => onAddToCart1(product)}
              >
                <i className="fa fa-shopping-cart"></i>
              </a>
              <ToastContainer />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
