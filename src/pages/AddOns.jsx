import { useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import Buttons from "../components/Buttons";
import styles from "./addOns.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setOffer } from "../features/addOnsSlice";
import { useNavigate } from "react-router";
import usePageNumber from "../usePageNumber";

const offers = [
  {
    offer: "Online service",
    monthlyPrice: 1,
    yearlyPrice: 10,
    desc: "Access to multiplayer games",
    chosen: true,
  },
  {
    offer: "Larger storage",
    monthlyPrice: 2,
    yearlyPrice: 20,
    desc: "Extra 1TB of cloud save",
    chosen: true,
  },
  {
    offer: "Customizable Profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
    desc: "Custom theme on your profile",
    chosen: false,
  },
];

function AddOns() {
  const planDuration = useSelector((store) => store.plan.planDuration);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  usePageNumber(3);

  const chosenOffers = useRef([
    {
      offer: "Online service",
      price:
        planDuration === "mo" ? offers[0].monthlyPrice : offers[0].yearlyPrice,
    },
    {
      offer: "Larger storage",
      price:
        planDuration === "mo" ? offers[1].monthlyPrice : offers[1].yearlyPrice,
    },
  ]);

  return (
    <div>
      <PageTitle title="Pick add-ons">
        Add-ons help enhance your gaming experience.
      </PageTitle>

      {offers.map((offer) => (
        <Offer
          key={offer.offer}
          offer={offer.offer}
          price={planDuration === "mo" ? offer.monthlyPrice : offer.yearlyPrice}
          chosenOffers={chosenOffers}
          planDuration={planDuration}
          chosen={offer.chosen}
        >
          {offer.desc}
        </Offer>
      ))}

      <Buttons
        handleNext={() => {
          dispatch(setOffer(chosenOffers.current));
          navigate("/summary");
        }}
      >
        Next Step
      </Buttons>
    </div>
  );
}

function Offer({ offer, price, planDuration, chosenOffers, children, chosen }) {
  const [isChosen, setIschosen] = useState(chosen);

  function handleClick() {
    setIschosen((chosen) => !chosen);

    if (chosenOffers.current.find((item) => item.offer === offer)) {
      chosenOffers.current = chosenOffers.current.filter(
        (item) => item.offer !== offer
      );
    } else {
      chosenOffers.current = [...chosenOffers.current, { offer, price }];
    }

    console.log(chosenOffers);
  }

  return (
    <div
      className={`${styles.offer} ${isChosen ? styles.chosen : ""}`}
      onClick={handleClick}
    >
      <input type="checkbox" checked={isChosen} readOnly />
      <div className="text">
        <h3>{offer}</h3>
        <span className={styles.desc}>{children}</span>
      </div>
      <div className={styles.price}>
        +${price}/{planDuration}
      </div>
    </div>
  );
}

export default AddOns;
