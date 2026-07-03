import { Link } from "react-router-dom";
import type { DishT } from "../types";

interface Props {
  dish: DishT;
  onDelete: () => void;
}

const Dish = ({ dish, onDelete }: Props) => {
  return (
    <div>
      <img src={dish.image} alt={dish.title} />
      <h3>{dish.title}</h3>
      <p>{dish.price}</p>
      <button onClick={onDelete}>Delete</button>
      <Link to={`/admin/edit/${dish.id}`}>Edit</Link>
    </div>
  );
};
export default Dish;
