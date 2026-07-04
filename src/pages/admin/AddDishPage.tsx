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
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Dish</h1>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <FormDish onSubmit={handleAdd} />
      </div>
    </div>
  );
};

export default AddDishPage;
