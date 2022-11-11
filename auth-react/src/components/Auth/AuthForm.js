import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const { login } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const urlSignIn =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAA7tqOc7BZ4O7F9RDT7HMjpLQ3HI3FnPM";
    const urlSignUp =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAA7tqOc7BZ4O7F9RDT7HMjpLQ3HI3FnPM";
    const url = isLogin ? urlSignIn : urlSignUp;

    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    })
      .then(async (res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data?.error?.message || "Authentication failed!");
          });
        }
      })
      .then(({ idToken, expiresIn: expiresInSeconds }) => {
        const expiresInMilliseconds = new Date().setMilliseconds(
          Number(expiresInSeconds) * 1000
        );
        login(idToken, expiresInMilliseconds);
        history.replace("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button disabled={isLoading}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
