import './App.css';
import Footer from './components_hust/Footer';
import Footer1 from './components_hust/Footer1';
import Header from './components_hust/Header';
import LeftMenu from './components_hust/LeftMenu';
import Login from './components_hust/Login';
import Menu from './components_hust/Menu';
import Content from './container_hust/Content';
import Post from './container_hust/Post';
import ManagerPost from './container_hust/ManagerPost';
import AddPostContainer from './container_hust/AddPostContainer';
import RegisterContainer from './container_hust/RegisterContainer';
import ChangePasswordContainer from './container_hust/ChangePasswordContainer';
import ListUsersContainer from './container_hust/ListUsersContainer';
import AddPost from './components_hust/AddPost';
import Register from './components_hust/Register';
import RegisterSuccess from './components_hust/RegisterSuccess'
import ChangePassword from './components_hust/ChangePassword'
import NewDetail from './container_hust/NewDetail';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createContext, useContext, useState, useEffect } from 'react';
import auth from "./service/auth";
import AuthContext from './service/context';
import Toast from './components_hust/Toast';
import { useSelector } from 'react-redux';
import "./App.css"
import News from './components_hust/News';
import BarChart from './components_hust/BarChart';
import StatisticContainer from './container_hust/StatisticContainer';
import Pagination from './components_hust/Pagination';

function ProvideAuth({ children }) {
  const verify = auth();
  const isAuth = useSelector(state => state.auth)
  return (
    <AuthContext.Provider value={isAuth}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useContext(AuthContext);
  const isAuth = useSelector(state => state.auth)
  return (
    <Route render={() => isAuth ? (children) : <Redirect to="/login" />} />
  );
}

function App() {


  return (
    <ProvideAuth>
      <Router>
        <Header />
        <Menu />
        <Switch>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Content />
          </Route>
          <Route exact path="/post">
            <Post />
          </Route>
          <Route exact path="/new-detail">
            <NewDetail />
          </Route>
          <Route exact path="/news">
            <NewDetail />
          </Route>
          {/* <Route exact path="/news">
            <News />
          </Route> */}
          <PrivateRoute exact path="/add-post">
            <AddPostContainer />
          </PrivateRoute>
          <PrivateRoute exact path="/statistic">
            <StatisticContainer />
          </PrivateRoute>
          <PrivateRoute exact path="/register">
            <RegisterContainer />
          </PrivateRoute>
          <PrivateRoute exact path="/users">
            <ListUsersContainer />
          </PrivateRoute>
          <PrivateRoute exact path="/change-password">
            <ChangePasswordContainer />
          </PrivateRoute>
          <PrivateRoute exact path="/manager-post">
            <ManagerPost />
          </PrivateRoute>

        </Switch>
        <Toast />
        <Footer1 />
      </Router>
    </ProvideAuth>
  );
}

export default App;
