import { useSelector } from "react-redux";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const { isAuthentication } = useSelector(({ auth }) => auth);

  if (!isAuthentication) {
    return;
  }

  return (
    <main className={classes.profile}>
      <h2>My User Profile</h2>
    </main>
  );
};

export default UserProfile;
