import { Link } from "react-router-dom";
import type { DishT } from "../types";

interface Props {
  dish: DishT;
  onDelete: () => void;
}

const Dish = ({ dish, onDelete }: Props) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
        <img
          src={dish.image}
          alt={dish.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{dish.title}</h3>
        <p className="text-indigo-600 font-bold">{dish.price} KGS</p>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/admin/edit/${dish.id}`}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={onDelete}
          className="px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default Dish;
