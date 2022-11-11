import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";

import styles from "./CourseInput.module.css";
import Button from "../../UI/Button/Button";

// import styled  from "styled-components";
// const FormControl = styled.div`
//   margin: 0.5rem 0;

//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${({ invalid }) => (invalid ? "red" : "black")};
//   }

//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${({ invalid }) => (invalid ? "red" : "#ccc")};
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//     background: ${({ invalid }) => (invalid ? "#ffd7d7" : "#transparent")};
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }
// `;

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    const text = event.target.value;
    if (!isEmpty(text)) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (isEmpty(enteredValue)) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
