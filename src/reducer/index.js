import { combineReducers } from 'redux';
import auth from './auth';
import admin from './admin';
import toast from './toast';
import post from './post';
import slug from './slug';
import slugParent from './slugParent';
import manager from './manager';
import statistic from './statistic';

const appReducers = combineReducers({
    auth,
    admin,
    toast,
    post,
    slug,
    manager,
    slugParent,
    statistic,
});

export default appReducers;