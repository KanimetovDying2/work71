import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import type { DishTMutation } from "../../types";
import { addDish } from "../../store/dishesSlice";
import FormDish from "../../components/FormDish";

const AddDishPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAdd = async (data: DishTMutation) => {
    const dishData = {
      ...data,
      price: Number(data.price),
    };
    await dispatch(addDish(dishData));
    navigate("/admin/dishes");
  };

  return (
    <div>
      <h1>Form Dish</h1>
      <FormDish onSubmit={handleAdd} />
    </div>
  );
};

export default AddDishPage;
