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
    <div>
      <h2>Dishes</h2>
      {dishes.map((d) => {
        return (
          <Dish key={d.id} dish={d} onDelete={() => handlerDelete(d.id)} />
        );
      })}
    </div>
  );
};
export default AdminDishesPage;
