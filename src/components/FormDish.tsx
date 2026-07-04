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
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={stateForm.title}
          onChange={changerHandler}
          required
        />
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={stateForm.price}
          onChange={changerHandler}
          required
        />
      </div>

      <div>
        <label htmlFor="image">Image Url</label>
        <input
          id="image"
          name="image"
          type="url"
          value={stateForm.image}
          onChange={changerHandler}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {initialData ? "Edit" : "Save"}
      </button>
    </form>
  );
};
export default FormDish;
