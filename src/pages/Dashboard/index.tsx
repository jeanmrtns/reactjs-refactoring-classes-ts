import { useState, useEffect } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

import { IFood } from "../../types/types";

export default function Dashboard() {
  const [foods, setFoods] = useState<IFood[]>();
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/foods");

      setFoods(response.data);
    }

    loadProducts();
  }, []);

  const handleAddFood = async (food: IFood) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      foods && setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: IFood) => {
    try {
      const foodUpdated =
        editingFood &&
        (await api.put(`/foods/${editingFood.id}`, {
          ...editingFood,
          ...food,
        }));

      const foodsUpdated =
        foods &&
        foods.map((f) => {
          if (foodUpdated) {
            return f.id !== foodUpdated.data.id ? f : foodUpdated.data;
          } else return null;
        });

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (food: IFood) => {
    await api.delete(`/foods/${food.id}`);

    const foodsFiltered = foods && foods.filter((f) => f.id !== food.id);

    setFoods(foodsFiltered);
  };

  const handleEditFood = (food: IFood) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food: IFood) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
