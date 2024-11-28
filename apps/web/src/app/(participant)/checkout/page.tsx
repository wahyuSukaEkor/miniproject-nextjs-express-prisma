import * as React from "react";
import MyChecoutList from "../views/checkout-list";

interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (props) => {
  return (
    <section >
      <MyChecoutList/>
    </section>
  );
};

export default CheckoutPage;
