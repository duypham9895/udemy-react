import { useDispatch, useSelector } from "react-redux";
import { validate as validateEmail } from "email-validator";
import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";

import classes from "./Auth.module.css";
import useInput from "../hooks/use-input";
import { login } from "../store/auth";

const validateInputEmail = (email) => validateEmail(email);
const validateInputPassword = (password) =>
  !isEmpty(password) && trim(password).length > 5;

const Auth = () => {
  const { isAuthentication } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    isValidValue: isValidEnteredEmail,
    hasError: hasErrorEnteredEmail,
    changeValueHandler: changeEmailHandler,
    blurValueHandler: blurEmailHandler,
    resetValue: resetInputEmail,
  } = useInput(validateInputEmail);

  const {
    value: enteredPassword,
    isValidValue: isValidEnteredPassword,
    hasError: hasErrorEnteredPassword,
    changeValueHandler: changePasswordHandler,
    blurValueHandler: blurPasswordHandler,
    resetValue: resetInputPassword,
  } = useInput(validateInputPassword);

  const isValidForm = isValidEnteredEmail && isValidEnteredPassword;

  const resetForm = () => {
    resetInputEmail();
    resetInputPassword();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("SUBMIT FORM");
    if (isValidForm) {
      dispatch(login());
      resetForm();
    }
  };

  // If logged in, we do not need show this form
  if (isAuthentication) {
    return;
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={submitHandler}>
          {/*  */}
          <div
            className={`${classes.control} ${
              hasErrorEnteredEmail && classes.invalid
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={changeEmailHandler}
              onBlur={blurEmailHandler}
            />
            {hasErrorEnteredEmail && (
              <p className={classes["error-text"]}>Email is not valid.</p>
            )}
          </div>
          <div
            className={`${classes.control} ${
              hasErrorEnteredPassword && classes.invalid
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={changePasswordHandler}
              onBlur={blurPasswordHandler}
            />
            {hasErrorEnteredPassword && (
              <p className={classes["error-text"]}>
                Password is not empty & more than 5 characters.
              </p>
            )}
          </div>
          <button type="submit" disabled={!isValidForm}>
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
