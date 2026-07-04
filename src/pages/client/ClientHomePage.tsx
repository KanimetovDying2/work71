import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchDishes } from "../../store/dishesSlice";
import { addToCart } from "../../store/cartSlice";
import Modal from "./Modal";
import Cart from "./Cart";

const ClientHomePage = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) => state.dishes.dishes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div>
      <h1>Turtle Pizza</h1>

      {dishes.map((dish) => (
        <div key={dish.id} onClick={() => dispatch(addToCart(dish.id))}>
          {dish.title} - {dish.price} KGS
        </div>
      ))}

      <button onClick={() => setIsModalOpen(true)}>Checkout</button>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Cart />
        {"checkoutForm soon"}
      </Modal>
    </div>
  );
};

export default ClientHomePage;
