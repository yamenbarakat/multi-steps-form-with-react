import styles from "./PageTitle.module.css";

function PageTitle({ title, children }) {
  return (
    <>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.descPage}>{children}</p>
    </>
  );
}

export default PageTitle;
