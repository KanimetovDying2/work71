import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createOrder } from "../../store/ordersSlice";

const CheckoutForm = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const items = useAppSelector((state) => state.cart.items);

  const isFormInvalid = !form.name || !form.address || !form.phone;

  const submitHandler = () => {
    const orderData = { customer: form, items };
    dispatch(createOrder(orderData));
  };

  return (
    <div>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Adress"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button disabled={isFormInvalid} onClick={submitHandler}>
        Order
      </button>
    </div>
  );
};

export default CheckoutForm;
