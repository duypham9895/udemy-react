import React from "react";
import isEmpty from "lodash/isEmpty";
import { validate as validateEmail } from "email-validator";

import useInput from "../hooks/use-input";

const SimpleInput = () => {
  const {
    value: enteredName,
    isValidValue: isValidEnteredName,
    hasError: hasErrorEnteredName,
    changeValueHandler: changeNameHandler,
    blurValueHandler: blurNameHandler,
    resetValue: resetInputName,
  } = useInput((name) => !isEmpty(name));

  const {
    value: enteredEmail,
    isValidValue: isValidEnteredEmail,
    hasError: hasErrorEnteredEmail,
    changeValueHandler: changeEmailHandler,
    blurValueHandler: blurEmailHandler,
    resetValue: resetInputEmail,
  } = useInput((email) => validateEmail(email));

  const isValidForm = isValidEnteredName && isValidEnteredEmail;

  const resetAllInputs = () => {
    resetInputName();
    resetInputEmail();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isValidForm) {
      resetAllInputs();
      return;
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={`form-control ${hasErrorEnteredName && "invalid"}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={changeNameHandler}
          onBlur={blurNameHandler}
        />
        {hasErrorEnteredName && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={`form-control ${hasErrorEnteredEmail && "invalid"}`}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={changeEmailHandler}
          onBlur={blurEmailHandler}
        />
        {hasErrorEnteredEmail && (
          <p className="error-text">Email is not valid.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isValidForm}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
