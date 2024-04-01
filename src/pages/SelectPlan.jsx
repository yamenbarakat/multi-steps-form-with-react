import { useReducer } from "react";
import PageTitle from "../components/PageTitle";
import styles from "./SelectPlan.module.css";
import Buttons from "../components/Buttons";
import { useDispatch } from "react-redux";
import { savePlan } from "../features/planSlice";
import { useNavigate } from "react-router";
import usePageNumber from "../usePageNumber";

const monthlyPlans = {
  arcade: 9,
  advanced: 12,
  pro: 15,
};

const yearlyPlans = {
  arcade: 90,
  advanced: 120,
  pro: 150,
};

const plansType = ["Arcade", "Advanced", "Pro"];

const initialState = {
  planDuration: "mo",
  plans: monthlyPlans,
  chosenPlan: { type: "Arcade", price: 9 },
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleDuration": {
      const isMonthly = state.planDuration === "mo";
      return {
        ...state,
        planDuration: isMonthly ? "yr" : "mo",
        plans: isMonthly ? yearlyPlans : monthlyPlans,
      };
    }
    case "selectPlan":
      return {
        ...state,
        chosenPlan: { type: action.payload.type, price: action.payload.price },
      };

    default:
      throw new Error("unknowen action type");
  }
}

function SelectPlan() {
  const [{ planDuration, plans, chosenPlan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const navigate = useNavigate();
  const dispatchRedux = useDispatch();

  usePageNumber(2);

  function handlePlan() {
    dispatchRedux(savePlan(chosenPlan.type, chosenPlan.price, planDuration));
    navigate("/add-ons");
  }

  return (
    <div>
      <PageTitle title="Select your plan">
        You have the option of monthly or yearly billing.
      </PageTitle>

      <PlansContainer>
        {plansType.map((planType) => (
          <Plan
            type={planType}
            price={plans[planType.toLowerCase()]}
            planDuration={planDuration}
            dispatch={dispatch}
            chosenPlan={chosenPlan}
            key={planType}
          />
        ))}
      </PlansContainer>

      <ChoosePlanDuration
        planDuration={planDuration}
        dispatch={dispatch}
        chosenPlan={chosenPlan}
      />

      <Buttons handleNext={handlePlan}>Next Step</Buttons>
    </div>
  );
}

function PlansContainer({ children }) {
  return <div className={styles.plans}>{children}</div>;
}

function Plan({ type, price, planDuration, dispatch, chosenPlan }) {
  return (
    <div
      className={`${styles.plan} ${chosenPlan.type === type ? "chosen" : ""}`}
      onClick={() => dispatch({ type: "selectPlan", payload: { type, price } })}
    >
      <img src={`./icon-${type.toLowerCase()}.svg`} alt={type} />
      <div className={styles.desc}>
        <h3>{type}</h3>
        <span className={styles.price}>
          ${price}/{planDuration}
        </span>
        {planDuration === "yr" && (
          <span className={styles.freeOffer}>2 months free</span>
        )}
      </div>
    </div>
  );
}

function ChoosePlanDuration({ planDuration, dispatch, chosenPlan }) {
  function handleClick() {
    dispatch({ type: "toggleDuration" });

    // update the price of selected plan
    const price =
      planDuration === "mo"
        ? yearlyPlans[chosenPlan.type.toLowerCase()]
        : monthlyPlans[chosenPlan.type.toLowerCase()];
    dispatch({ type: "selectPlan", payload: { type: chosenPlan.type, price } });
  }
  return (
    <div className={styles.planDuration}>
      <span className={planDuration === "mo" ? "chosen" : ""}>Monthly</span>
      <div className={styles.indecator} onClick={handleClick}>
        <span className={planDuration === "mo" ? "mo" : "yr"}></span>
      </div>
      <span className={planDuration === "yr" ? "chosen" : ""}>Yearly</span>
    </div>
  );
}

export default SelectPlan;
