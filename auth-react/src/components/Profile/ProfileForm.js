import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const { token, login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAA7tqOc7BZ4O7F9RDT7HMjpLQ3HI3FnPM";

    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: token,
        password: newPassword,
        returnSecureToken: true,
      }),
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
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button disabled={isLoading}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
