import { useDispatch, useSelector } from 'react-redux';
import Product from './Product'
import { actAddToCart, actChangeMessage, actFetchProduct } from './../action/index'
import { useState, useEffect } from 'react';
import axios from 'axios';

Products.propTypes = {

};

function Products(props) {
  const [productsAPI, setProductAPI] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      await axios.get(`http://localhost:8081/product`)
        .then(res => {
          const productsFetch = res.data.content;
          setProductAPI(productsFetch)
        })
        .catch(error => console.log(error));
    }
    fetchProduct();
  }, []);

  const dispatch = useDispatch();
  const onAddToCart = (product) => dispatch(actAddToCart(product, 1));
  const onChangeMessage = (message) => dispatch(actChangeMessage(message));

  const onFetchProduct = (productsAPI) => dispatch(actFetchProduct(productsAPI));
  onFetchProduct(productsAPI);

  return (
    <section className="section">
      <h1 className="section-heading">Danh Sách Sản Phẩm</h1>
      <div className="row">
        {productsAPI.map((product, index) => {
          return <Product
            key={index}
            product={product}
            onAddToCart={onAddToCart}
            onChangeMessage={onChangeMessage}
          />
        })}
      </div>
    </section>
  )
}

export default Products;
