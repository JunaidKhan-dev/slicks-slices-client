import React, { useState, createContext } from 'react';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };
export default OrderProvider;
