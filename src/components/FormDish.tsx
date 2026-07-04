import { useEffect, useState } from "react";
import type { DishT, DishTMutation } from "../types";

interface Props {
  initialData?: DishT;
  onSubmit: (dish: DishTMutation) => void;
  isLoading?: boolean;
}

const FormDish = ({ initialData, onSubmit, isLoading }: Props) => {
  const [stateForm, setStateForm] = useState<DishTMutation>({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setStateForm({
        title: initialData.title,
        price: initialData.price,
        image: initialData.image,
      });
    }
  }, [initialData]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = stateForm.title.trim();
    let trimmedImage = stateForm.image.trim();

    if (trimmedTitle.length === 0) {
      alert("Please type something before send!");
      return;
    }

    if (trimmedImage.length === 0) {
      trimmedImage = "https://example.com/default-dish.jpg";
    }

    onSubmit({
      ...stateForm,
      title: trimmedTitle,
      image: trimmedImage,
      price: Number(stateForm.price),
    });
  };

  const changerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={stateForm.title}
          onChange={changerHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price (KGS)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={stateForm.price}
          onChange={changerHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image Url
        </label>
        <input
          id="image"
          name="image"
          type="url"
          value={stateForm.image}
          onChange={changerHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-200"
      >
        {isLoading ? "Saving..." : initialData ? "Save Changes" : "Create Dish"}
      </button>
    </form>
  );
};
export default FormDish;
