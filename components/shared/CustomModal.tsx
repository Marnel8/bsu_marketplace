import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface CustomModalProps {
  DialogTriggerBtn: React.ReactNode;
  modalTitle: string;
  description: string;
  mainContent: React.ReactNode;
  handleClick: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  DialogTriggerBtn,
  modalTitle,
  description,
  mainContent,
  handleClick
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{DialogTriggerBtn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {mainContent}
        <DialogFooter>
          <Button type="submit" onClick={handleClick}>Confirm Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
