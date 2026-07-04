import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchOrders, deleteOrder } from "../../store/ordersSlice";
import { fetchDishes } from "../../store/dishesSlice";
import Spinner from "../../components/Spinner";

const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) => state.dishes.dishes);
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchDishes());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Customer Orders</h1>

      {orders.length === 0 ? (
        <div className="text-gray-500 bg-white p-8 rounded-2xl text-center border border-gray-100">
          No orders yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start border-b border-gray-50 pb-4 mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {o.customer.name}
                  </h3>
                  <p className="text-sm text-gray-500">{o.customer.address}</p>
                  <p className="text-sm font-medium text-indigo-600">
                    {o.customer.phone}
                  </p>
                </div>
                <button
                  disabled={loading}
                  onClick={() => dispatch(deleteOrder(o.id))}
                  className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-semibold rounded-lg transition-colors"
                >
                  Complete Order
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Order items:
                </p>
                {Object.entries(o.items).map(([dishId, count]) => {
                  const dish = dishes.find((d) => d.id === dishId);
                  return (
                    <div key={dishId} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {dish ? dish.title : "Unknown"}
                      </span>
                      <span className="font-medium">x {count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
