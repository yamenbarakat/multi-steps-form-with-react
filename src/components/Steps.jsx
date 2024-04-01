import { useSelector } from "react-redux";
import styles from "./Steps.module.css";

function Steps() {
  return (
    <aside className={styles.aside}>
      <ul>
        <Step num={1}>your info</Step>
        <Step num={2}>select plan</Step>
        <Step num={3}>add-ons</Step>
        <Step num={4}>summary</Step>
      </ul>
    </aside>
  );
}

function Step({ num, children }) {
  const pageNumber = useSelector((store) => store.page.pageNumber);

  return (
    <li className={pageNumber === num ? styles.active : ""}>
      <div className={styles.step}>
        <span>step {num}</span>
        <span>{children}</span>
      </div>
    </li>
  );
}

export default Steps;
