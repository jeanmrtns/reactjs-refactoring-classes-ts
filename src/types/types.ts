export interface IFood {
  id: string;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export interface FoodInterface {
  handleDelete: (food: IFood) => Promise<any>;
  handleEditFood: (food: IFood) => void;
  food: IFood;
}

export interface FoodType {
  image: string;
  name: string;
  price: string;
  description: string;
}
