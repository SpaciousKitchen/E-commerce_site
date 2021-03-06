import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UploadPage from "./views/UploadPage/UploadPage.js";
import UserDetailPage from "./views/UserDetailPage/UserDetailPage.js";
import UserEditPage from "./views/UserEditPage/UserEditPage.js";
import SubPage from "./views/SubPage/SubPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/sub" component={Auth(SubPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/upload" component={Auth(UploadPage, true)} />
          <Route exact path="/account" component={Auth(UserDetailPage, true)} />
          <Route exact path="/account/edit" component={Auth(UserEditPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
};

export default App;