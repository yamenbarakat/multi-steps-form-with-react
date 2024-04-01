import { useNavigate } from "react-router";
import styles from "./Buttons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../features/pageSlice";

function Buttons({ showBackBtn = true, handleNext, children, confirm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageNumber = useSelector((store) => store.page.pageNumber);

  function handleBack() {
    dispatch(setPageNumber(pageNumber - 1));
    navigate(-1);
  }
  return (
    <div className={styles.buttons}>
      <div className={styles.container}>
        {showBackBtn && (
          <button className={styles.back} onClick={handleBack}>
            Go Back
          </button>
        )}
        <button
          className={`${styles.next} ${confirm && styles.confirm}`}
          onClick={handleNext}
        >
          {children}
        </button>
      </div>
    </div>
  );
}

export default Buttons;
