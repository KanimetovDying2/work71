import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchDishes } from "../../store/dishesSlice";
import { addToCart } from "../../store/cartSlice";
import Modal from "./Modal";
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";

const ClientHomePage = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) => state.dishes.dishes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Turtle Pizza</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-transform hover:scale-105"
        >
          Checkout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            onClick={(e) => {
              dispatch(addToCart(dish.id));
              const el = e.currentTarget;
              el.classList.add("bg-red-100");
              setTimeout(() => el.classList.remove("bg-red-100"), 300);
            }}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm 
            hover:shadow-xl transition-all duration-300 cursor-pointer 
            active:scale-95"
          >
            <div className="h-40 rounded-2xl overflow-hidden mb-4">
              <img
                src={dish.image}
                alt={dish.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{dish.title}</h3>
            <p className="text-indigo-600 font-bold text-lg mt-1">
              {dish.price} KGS
            </p>
          </div>
        ))}
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
          <Cart />
          <CheckoutForm onSuccess={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default ClientHomePage;
