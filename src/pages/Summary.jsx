import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import styles from "./Summary.module.css";
import { useSelector } from "react-redux";
import Buttons from "../components/Buttons";
import usePageNumber from "../usePageNumber";

function Summary() {
  const plan = useSelector((store) => store.plan);
  const offers = useSelector((store) => store.offers.offers);
  const time = plan.planDuration;
  const isMonthly = time === "mo";
  const totalPrice =
    offers.reduce((acc, offer) => acc + offer.price, 0) + plan.price;

  const navigate = useNavigate();

  usePageNumber(4);

  return (
    <div>
      <PageTitle title="Finishing up">
        Double-check everything looks OK before confirming.
      </PageTitle>

      <div className={styles.summary}>
        <ul>
          <li className={styles.chosenPlan}>
            <div>
              <h3>
                {plan.type} ({isMonthly ? "Monthly" : "Yearly"})
              </h3>
              <Link to="/plan" className={styles.changePlan}>
                Change
              </Link>
            </div>
            <span className={styles.planPrice}>
              ${plan.price}/{time}
            </span>
          </li>

          {offers.map((offer) => (
            <li className={styles.offer} key={offer.offer}>
              <h3>{offer.offer}</h3>
              <span>
                ${offer.price}/{time}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          <h3>Total (per {isMonthly ? "month" : "year"})</h3>
          <span className={styles.totalPrice}>${totalPrice}/mo</span>
        </div>
      </div>

      <Buttons handleNext={() => navigate("/finish")} confirm="confirm">
        Confirm
      </Buttons>
    </div>
  );
}

export default Summary;
