import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createOrder } from "../../store/ordersSlice";

interface Props {
  onSuccess: () => void;
}

const CheckoutForm = ({ onSuccess }: Props) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const items = useAppSelector((state) => state.cart.items);

  const isFormInvalid = !form.name || !form.address || !form.phone;

  const submitHandler = () => {
    const orderData = { customer: form, items };
    dispatch(createOrder(orderData));
    onSuccess();
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all";

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <h3 className="font-bold text-gray-800">Delivery Details</h3>
      <input
        className={inputClass}
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Delivery Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button
        disabled={isFormInvalid}
        onClick={submitHandler}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutForm;
