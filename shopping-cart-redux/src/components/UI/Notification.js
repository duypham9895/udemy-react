import { useSelector } from "react-redux";
import classes from "./Notification.module.css";

const Notification = () => {
  const { notification } = useSelector(({ ui }) => ui);
  const { status, title, message } = notification || {};
  if (!status) {
    return;
  }

  const errorClass = status === "ERROR" && classes.error;
  const successClass = status === "SUCCESS" && classes.success;

  const cssClasses = `${classes.notification} ${errorClass || successClass}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
