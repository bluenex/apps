import { FC } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiEdit,
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { TbPin, TbPinnedOff } from "react-icons/tb";
import Button from "../components/Button";
import TapOutsideDetector from "../components/TapOutsideDetector";

interface InstructionsModalProps {
  onClose: () => void;
}

const InstructionsModal: FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 grid h-screen w-screen place-content-center bg-black bg-opacity-50 p-2">
      <TapOutsideDetector
        triggererId="instructions-triggerer"
        onTapOutside={onClose}
      >
        <div className="shadow-dark mb-24 grid max-w-sm gap-2 rounded bg-black p-4 pb-6">
          <div className="flex justify-end">
            <Button onClick={onClose}>
              <FiX className="text-2xl" />
            </Button>
          </div>

          <p className="flex items-start gap-4">
            <span className="flex w-10 items-center justify-center">
              <FiEye /> / <FiEyeOff />
            </span>
            Exclude or include the record from the total calculation.
          </p>
          <p className="flex items-start gap-4">
            <span className="flex w-10 items-center justify-center">
              <FiArrowUp /> / <FiArrowDown />
            </span>
            Move the record up or down.
          </p>
          <p className="flex items-start gap-4">
            <span className="flex w-10 items-center justify-center">
              <TbPin /> / <TbPinnedOff />
            </span>
            Pin the record, the pinned items are grouped above other items.
          </p>
          <p className="flex items-center gap-4">
            <span className="w-10">
              <FiEdit className="mx-auto" />
            </span>
            Edit the record.
          </p>
          <p className="flex items-center gap-4">
            <span className="w-10">
              <FiTrash2 className="mx-auto" />
            </span>
            Delete the record.
          </p>
        </div>
      </TapOutsideDetector>
    </div>
  );
};

export default InstructionsModal;
