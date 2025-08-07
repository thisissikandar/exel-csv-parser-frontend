import React from "react";
import { Button } from "./ui/button";

interface CrouselButtonProps {
  handlePrevious: () => void;
  handleNext: () => void;
}

const CrouselButton = ({ handlePrevious, handleNext }: CrouselButtonProps) => {
  return (
    <div className="flex justify-between w-12 gap-3 ">
      <Button onClick={handlePrevious}>previous</Button>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};

export default CrouselButton;
