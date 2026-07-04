import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import FormDish from "../../components/FormDish";
import Spinner from "../../components/Spinner";
import type { DishT, DishTMutation } from "../../types";
import { updateDish } from "../../store/dishesSlice";

const EditDishPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { dishes, loading } = useAppSelector((state) => state.dishes);

  const dish = dishes.find((d) => d.id === id);

  if (loading || !dish) return <Spinner />;

  const editHandler = async (data: DishTMutation) => {
    if (id) {
      const dishData: Omit<DishT, "id"> = {
        ...data,
        price: Number(data.price),
      };

      await dispatch(updateDish({ id, dishData }));
      navigate("/admin/dishes");
    }
  };

  return <FormDish initialData={dish} onSubmit={editHandler} />;
};

export default EditDishPage;
