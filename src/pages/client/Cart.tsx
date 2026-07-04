import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { removeFromCart } from "../../store/cartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const dishes = useAppSelector((state) => state.dishes.dishes);

  if (Object.keys(items).length === 0) {
    return <div>Cart is empty!</div>;
  }

  const dishMap = dishes.reduce(
    (acc, d) => ({ ...acc, [d.id]: d }),
    {} as Record<string, any>,
  );

  const cartEntries = Object.entries(items);

  const total = cartEntries.reduce((acc, [id, count]) => {
    const dish = dishMap[id];
    return acc + (dish ? dish.price * count : 0);
  }, 150);

  return (
    <div>
      {cartEntries.map(([id, count]) => {
        const dish = dishMap[id];
        if (!dish) return null;
        return (
          <div key={id}>
            {dish.title} - {count} x - {dish.price * count} som
            <button onClick={() => dispatch(removeFromCart(id))}>Remove</button>
          </div>
        );
      })}
      <strong>Total: {total}</strong>
    </div>
  );
};

export default Cart;
