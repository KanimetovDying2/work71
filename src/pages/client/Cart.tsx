import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { removeFromCart } from "../../store/cartSlice";
import type { DishT } from "../../types";

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const dishes = useAppSelector((state) => state.dishes.dishes);

  if (Object.keys(items).length === 0) {
    return <div>Cart is empty!</div>;
  }

  const dishMap = dishes.reduce(
    (acc, d) => {
      acc[d.id] = d;
      return acc;
    },
    {} as Record<string, DishT>,
  );

  const cartEntries = Object.entries(items);

  const total = cartEntries.reduce((acc, [id, count]) => {
    const dish = dishMap[id];
    return acc + (dish ? dish.price * count : 0);
  }, 150);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {cartEntries.map(([id, count]) => {
          const dish = dishMap[id];
          if (!dish) return null;
          return (
            <div
              key={id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-xl"
            >
              <div>
                <span className="font-semibold text-gray-800">
                  {dish.title}
                </span>
                <p className="text-sm text-gray-500">
                  {count} x {dish.price} KGS
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-800">
                  {dish.price * count} KGS
                </span>
                <button
                  onClick={() => dispatch(removeFromCart(id))}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg">
        <span className="font-bold text-gray-800">Total (with delivery):</span>
        <span className="text-indigo-600 font-extrabold">{total} KGS</span>
      </div>
    </div>
  );
};

export default Cart;
