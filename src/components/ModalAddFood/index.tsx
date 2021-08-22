import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { useRef, FormHTMLAttributes } from "react";

import { IFood } from "../../types/types";

interface ModalAddFoodProps extends FormHTMLAttributes<HTMLFormElement> {
  setIsOpen: () => void;
  handleAddFood: (food: IFood) => Promise<void>;
  isOpen: boolean;
}

function ModalAddFood(props: ModalAddFoodProps) {
  const formRef = useRef(null);
  const { setIsOpen, handleAddFood, isOpen } = props;

  async function handleSubmit(data: IFood) {
    handleAddFood(data);
    console.log(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;
