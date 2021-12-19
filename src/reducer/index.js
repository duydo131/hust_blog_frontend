import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import message from './message';
import auth from './auth';
import admin from './admin';

const appReducers = combineReducers({
    products,
    cart,
    message,
    auth,
    admin
});

export default appReducers;