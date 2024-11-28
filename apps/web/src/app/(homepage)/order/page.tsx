import * as React from 'react';
import HistorySection from '../views/order-views/history';

interface IOrderPageProps {
}

const OrderPage: React.FunctionComponent<IOrderPageProps> = (props) => {
  return <section>
    <HistorySection/>
  </section>;
};

export default OrderPage;
