import React from "react";
import isEmpty from "lodash/isEmpty";
import { validate as validateEmail } from "email-validator";

import useInput from "../hooks/use-input";

const validateInputName = (name) => !isEmpty(name);
const validateInputEmail = (email) => validateEmail(email);

const BasicForm = () => {
  const {
    value: enteredFirstName,
    isValidValue: isValidEnteredFirstName,
    hasError: hasErrorEnteredFirstName,
    changeValueHandler: changeFirstNameHandler,
    blurValueHandler: blurFirstNameHandler,
    resetValue: resetInputFirstName,
  } = useInput(validateInputName);

  const {
    value: enteredLastName,
    isValidValue: isValidEnteredLastName,
    hasError: hasErrorEnteredLastName,
    changeValueHandler: changeLastNameHandler,
    blurValueHandler: blurLastNameHandler,
    resetValue: resetInputLastName,
  } = useInput(validateInputName);

  const {
    value: enteredEmail,
    isValidValue: isValidEnteredEmail,
    hasError: hasErrorEnteredEmail,
    changeValueHandler: changeEmailHandler,
    blurValueHandler: blurEmailHandler,
    resetValue: resetInputEmail,
  } = useInput(validateInputEmail);

  const isValidForm =
    isValidEnteredFirstName && isValidEnteredEmail && isValidEnteredLastName;

  const resetAllInputs = () => {
    resetInputFirstName();
    resetInputLastName();
    resetInputEmail();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    resetAllInputs();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={enteredFirstName}
            onChange={changeFirstNameHandler}
            onBlur={blurFirstNameHandler}
          />
          {hasErrorEnteredFirstName && (
            <p className="error-text">First Name must not be empty.</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={enteredLastName}
            onChange={changeLastNameHandler}
            onBlur={blurLastNameHandler}
          />
          {hasErrorEnteredLastName && (
            <p className="error-text">Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
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

export default BasicForm;
