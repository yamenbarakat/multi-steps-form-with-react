import styles from "./Finish.module.css";

function Finish() {
  return (
    <div className={styles.confirmation}>
      <img src="/icon-thank-you.svg" alt="thenk you" />
      <h1>Thank you!</h1>
      <p>
        confirming your subscription! We hope you have fun using our platform.
        If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

export default Finish;
