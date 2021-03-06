import express from "express";
import passport from "passport";
import routes from "../routes";
import { auth } from "../middleware";
import {
  authSuccess,
  register,
  login,
  // userDetail,
  logout,
  checkEmail,
  addCart,
  removeCart,
  addWishList,
  removeWishList,
} from "../controllers/userController";
import {
  kakaoLogin,
  postKakaoLogin,
  naverLogin,
  postNaverLogin,
  googleLogin,
  postGoogleLogin,
} from "../controllers/snsController";

const userRouter = express.Router();

userRouter.get(routes.auth, auth, authSuccess);
userRouter.post(routes.register, register);
userRouter.post(routes.login, login);
userRouter.post(routes.checkEmail, auth, checkEmail);
// userRouter.get(routes.userDetail, auth, userDetail);
userRouter.get(routes.logout, auth, logout);

userRouter.get(routes.kakao, kakaoLogin);
userRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postKakaoLogin
);

userRouter.get(routes.naver, naverLogin);
userRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: routes.login }),
  postNaverLogin
);

userRouter.get(routes.google, googleLogin);
userRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: routes.login }),
  postGoogleLogin
);

userRouter.post(routes.addCart, auth, addCart);
userRouter.delete(routes.removeCart, auth, removeCart);
userRouter.post(routes.addWishList, auth, addWishList);
userRouter.delete(routes.removeWishList, auth, removeWishList);

export default userRouter;
