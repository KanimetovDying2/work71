import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteDish, fetchDishes } from "../../store/dishesSlice";
import Spinner from "../../components/Spinner";
import Dish from "../../components/Dish";

const AdminDishesPage = () => {
  const dispatch = useAppDispatch();
  const { dishes, loading } = useAppSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handlerDelete = (id: string) => {
    dispatch(deleteDish(id));
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dishes Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dishes.length > 0 ? (
          dishes.map((d) => (
            <Dish key={d.id} dish={d} onDelete={() => handlerDelete(d.id)} />
          ))
        ) : (
          <p className="text-gray-500">No dishes available. Add one!</p>
        )}
      </div>
    </div>
  );
};
export default AdminDishesPage;
