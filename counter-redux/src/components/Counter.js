import React from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";
import {
  decrement,
  increase,
  increment,
  toggleCounter,
} from "../store/counter";

const Counter = () => {
  const { counter, isShowCounter } = useSelector(({ counter }) => counter);
  const { isAuthentication } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch(toggleCounter());
  };

  const increaseHandler = () => {
    dispatch(increment());
  };
  const increaseByFiveHandler = () => {
    dispatch(increase(5));
  };
  const decreaseHandler = () => {
    dispatch(decrement());
  };

  const CounterContent = (
    <>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={increaseHandler}>Increase</button>
        <button onClick={increaseByFiveHandler}>Increase by 5</button>
        <button onClick={decreaseHandler}>Decrease</button>
      </div>
    </>
  );

  if (!isAuthentication) {
    return;
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {isShowCounter && CounterContent}

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends React.Component {
//   toggleCounterHandler() {}

//   increaseHandler() {
//     this.props.increment();
//   }

//   decreaseHandler() {
//     this.props.decrement();
//   }

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.increaseHandler.bind(this)}>Increase</button>
//           <button onClick={this.decreaseHandler.bind(this)}>Decrease</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = ({ counter }) => ({ counter });
// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch({ type: "INCREMENT" }),
//   decrement: () => dispatch({ type: "DECREMENT" }),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
