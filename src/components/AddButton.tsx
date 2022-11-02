import { FiPlus } from "react-icons/fi";
import Button from "./Button";

const AddButton = () => {
  return (
    <Button className="shadow-common fixed bottom-6 right-6 rounded-full bg-sky-700 p-4">
      <FiPlus className="text-xl" />
    </Button>
  );
};

export default AddButton;
