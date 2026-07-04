import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchOrders, deleteOrder } from "../../store/ordersSlice";
import { fetchDishes } from "../../store/dishesSlice";

const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) => state.dishes.dishes);
  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchDishes());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o) => (
          <div
            key={o.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>Customer: {o.customer.name}</h3>
            <p>Address: {o.customer.address}</p>
            <p>Phone: {o.customer.phone}</p>

            <strong>Items:</strong>
            {Object.entries(o.items).map(([dishId, count]) => {
              const dish = dishes.find((d) => d.id === dishId);
              return (
                <div key={dishId}>
                  {dish ? dish.title : "Unknown"} x {count}
                </div>
              );
            })}

            <button
              disabled={loading}
              onClick={() => dispatch(deleteOrder(o.id))}
              style={{ marginTop: "10px" }}
            >
              Complete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrdersPage;
