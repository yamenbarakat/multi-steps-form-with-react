import Buttons from "../components/Buttons";
import PageTitle from "../components/PageTitle";
import styles from "./InfoForm.module.css";
import { useDispatch } from "react-redux";
import { saveForm } from "../features/formSlice";
import { useNavigate } from "react-router";
import usePageNumber from "../usePageNumber";
import { useForm } from "react-hook-form";

const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const isValidPhone = /^\+\d{10}$/;

function InfoForm() {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  usePageNumber(1);

  function handleForm(data) {
    dispatch(saveForm(data.name, data.email, data.phone));
    navigate("./plan");
  }

  return (
    <div>
      <PageTitle title="Personal info">
        Please provide your name, email address, and phone number.
      </PageTitle>

      <form
        action=""
        className={styles.form}
        onSubmit={handleSubmit(handleForm)}
      >
        <div className={styles.box}>
          <div className={styles.error}>
            {errors?.name ? errors?.name.message : ""}
          </div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Stephen King"
            {...register("name", {
              required: "This filed is required",
            })}
            className={errors?.name ? styles.required : ""}
          />
        </div>

        <div className={styles.box}>
          <div className={styles.error}>
            {errors?.email ? errors.email.message : ""}
          </div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            {...register("email", {
              required: "This filed is required",
              validate: (value) =>
                isValidEmail.test(value) || "invalid email address",
            })}
            className={errors?.email ? styles.required : ""}
          />
        </div>

        <div className={styles.box}>
          <div className={styles.error}>
            {errors?.phone ? errors.phone.message : ""}
          </div>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="e.g. +1 234 567 890"
            {...register("phone", {
              required: "This filed is required",
              validate: (value) =>
                isValidPhone.test(value) || "invalid phone number",
            })}
            className={errors?.phone ? styles.required : ""}
          />
        </div>

        <Buttons showBackBtn={false}>Next Step</Buttons>
      </form>
    </div>
  );
}

export default InfoForm;
