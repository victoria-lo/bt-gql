import { createContext, useState, useContext } from "react";

export const Context = createContext();

/*custom hook*/
export const useValues = () => useContext(Context);

export default function ContextProvider({ children }) {
  const [clientToken, setClientToken] = useState();
  const [transaction, setTransaction] = useState(null);
  const [amount, setAmount] = useState(1);
  const [flow, setFlow] = useState("checkout");
  const [paymentType, setPaymentType] = useState();

  const reset = () => {
    setClientToken(null);
    setTransaction(null);
    setPaymentType(null);
    setFlow("checkout");
  };

  return (
    <Context.Provider
      value={{ amount, setAmount, clientToken, setClientToken, transaction, setTransaction, flow, setFlow, reset, paymentType, setPaymentType }}
    >
      {children}
    </Context.Provider>
  );
}
